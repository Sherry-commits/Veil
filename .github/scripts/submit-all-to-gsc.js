#!/usr/bin/env node
/**
 * Submits all blog posts to Google Search Console Indexing API.
 * Runs via GitHub Actions weekly cron.
 * Requires env var: GSC_CREDENTIALS_JSON (full service account JSON string)
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

const SITE = 'https://veil.wonlv.com'
const BLOG_DIR = path.join(__dirname, '../../content/blog')

async function getAccessToken() {
  const raw = process.env.GSC_CREDENTIALS_JSON
  if (!raw) throw new Error('GSC_CREDENTIALS_JSON env var is not set')
  const key = JSON.parse(raw)

  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT', kid: key.private_key_id }
  const payload = {
    iss: key.client_email,
    sub: key.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }
  const encode = obj => Buffer.from(JSON.stringify(obj)).toString('base64url')
  const sigInput = encode(header) + '.' + encode(payload)
  const crypto = require('crypto')
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(sigInput)
  const jwt = sigInput + '.' + sign.sign(key.private_key, 'base64url')

  return new Promise((resolve, reject) => {
    const body = `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`
    const req = https.request({
      hostname: 'oauth2.googleapis.com', path: '/token', method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }, res => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => {
        const r = JSON.parse(data)
        r.access_token ? resolve(r.access_token) : reject(new Error('OAuth failed: ' + data))
      })
    })
    req.write(body)
    req.end()
  })
}

function submitUrl(token, url) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({ url, type: 'URL_UPDATED' })
    const req = https.request({
      hostname: 'indexing.googleapis.com',
      path: '/v3/urlNotifications:publish',
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
    }, res => {
      let data = ''
      res.on('data', c => data += c)
      res.on('end', () => {
        if (res.statusCode === 200) resolve(JSON.parse(data))
        else reject(new Error(`API ${res.statusCode}: ${data}`))
      })
    })
    req.write(body)
    req.end()
  })
}

async function main() {
  const slugs = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))

  if (slugs.length === 0) { console.log('No blog posts found.'); return }

  console.log(`Found ${slugs.length} post(s). Getting GSC access token...`)
  const token = await getAccessToken()

  let ok = 0, fail = 0
  for (const slug of slugs) {
    const url = `${SITE}/blog/${slug}`
    try {
      await submitUrl(token, url)
      console.log(`✅ ${url}`)
      ok++
    } catch (e) {
      console.error(`❌ ${url} — ${e.message}`)
      fail++
    }
  }

  console.log(`\nDone: ${ok} submitted, ${fail} failed.`)
  if (fail > 0) process.exit(1)
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1) })

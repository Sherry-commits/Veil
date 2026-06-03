#!/usr/bin/env node
/**
 * Submits all blog posts to IndexNow API.
 * IndexNow is supported by Google, Bing, Yandex — no auth required.
 * Runs via GitHub Actions weekly cron.
 */

const https = require('https')
const fs = require('fs')
const path = require('path')

const SITE = 'veil.wonlv.com'
const INDEX_NOW_KEY = '3218fa7301568a6036c7c8f5e300f2ef'
const BLOG_DIR = path.join(__dirname, '../../content/blog')

function post(hostname, path, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body)
    const req = https.request({
      hostname, path, method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(data) },
    }, res => {
      let out = ''
      res.on('data', c => out += c)
      res.on('end', () => resolve({ status: res.statusCode, body: out }))
    })
    req.on('error', reject)
    req.write(data)
    req.end()
  })
}

async function main() {
  const slugs = fs.readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace('.md', ''))

  if (slugs.length === 0) { console.log('No blog posts found.'); return }

  const urlList = [
    `https://${SITE}/`,
    `https://${SITE}/blog`,
    ...slugs.map(s => `https://${SITE}/blog/${s}`),
  ]

  console.log(`Submitting ${urlList.length} URLs to IndexNow...`)
  urlList.forEach(u => console.log(' ', u))

  const payload = {
    host: SITE,
    key: INDEX_NOW_KEY,
    keyLocation: `https://${SITE}/${INDEX_NOW_KEY}.txt`,
    urlList,
  }

  // Submit to api.indexnow.org (relays to Google, Bing, Yandex)
  const res = await post('api.indexnow.org', '/indexnow', payload)
  console.log(`\nIndexNow response: ${res.status}`)

  if (res.status === 200 || res.status === 202) {
    console.log('✅ All URLs submitted successfully.')
  } else if (res.status === 422) {
    console.log('⚠️  Some URLs were invalid or already recently submitted.')
  } else {
    console.error('❌ Unexpected response:', res.body)
    process.exit(1)
  }
}

main().catch(err => { console.error('Fatal:', err.message); process.exit(1) })

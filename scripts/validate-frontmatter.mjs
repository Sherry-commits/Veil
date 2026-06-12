#!/usr/bin/env node
/**
 * Validate the YAML frontmatter of blog posts using the SAME parser the site
 * build uses (gray-matter). Catches malformed frontmatter — e.g. a backslash-
 * escaped apostrophe inside a single-quoted string (`life\'s`), which is invalid
 * YAML and crashes `next build` during static prerendering.
 *
 * Usage:
 *   node scripts/validate-frontmatter.mjs                # published posts (content/blog/*.md)
 *   node scripts/validate-frontmatter.mjs --all          # published + drafts
 *   node scripts/validate-frontmatter.mjs <file> [file]  # specific files
 *
 * Exits 1 (with a clear, file+line error) if any file is invalid.
 */
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const root = process.cwd()
const args = process.argv.slice(2)
const includeDrafts = args.includes('--all')
const fileArgs = args.filter((a) => !a.startsWith('--'))

const REQUIRED = ['title', 'date', 'slug', 'description']

function gatherFiles() {
  if (fileArgs.length) return fileArgs.map((f) => path.resolve(root, f))

  const blogDir = path.join(root, 'content', 'blog')
  const files = []
  if (fs.existsSync(blogDir)) {
    for (const f of fs.readdirSync(blogDir)) {
      if (f.endsWith('.md')) files.push(path.join(blogDir, f))
    }
    if (includeDrafts) {
      const draftsDir = path.join(blogDir, 'drafts')
      if (fs.existsSync(draftsDir)) {
        for (const f of fs.readdirSync(draftsDir)) {
          if (f.endsWith('.md')) files.push(path.join(draftsDir, f))
        }
      }
    }
  }
  return files
}

const files = gatherFiles()
const errors = []

for (const file of files) {
  const rel = path.relative(root, file)
  let raw
  try {
    raw = fs.readFileSync(file, 'utf8')
  } catch (e) {
    errors.push(`${rel}: cannot read file — ${e.message}`)
    continue
  }

  let data
  try {
    ;({ data } = matter(raw))
  } catch (e) {
    const line = e.mark && e.mark.line != null ? ` (line ${e.mark.line + 1})` : ''
    errors.push(`${rel}: invalid YAML frontmatter${line} — ${e.reason || e.message}`)
    continue
  }

  for (const key of REQUIRED) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      errors.push(`${rel}: missing required frontmatter field "${key}"`)
    }
  }
}

if (errors.length) {
  console.error(`\n❌ Frontmatter validation failed (${errors.length} issue${errors.length > 1 ? 's' : ''}):\n`)
  for (const e of errors) console.error('  • ' + e)
  console.error(
    "\nTip: inside a single-quoted YAML string, write an apostrophe as TWO single quotes ('')." +
      "\n     e.g.  life''s floods   |   the Lions'' Den   |   God''s promise\n"
  )
  process.exit(1)
}

console.log(`✓ Frontmatter OK — ${files.length} file${files.length === 1 ? '' : 's'} checked`)

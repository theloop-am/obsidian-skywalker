#!/usr/bin/env node
/*
 * Skywalker - Theme for Obsidian
 * Copyright (c) 2026 theLOOP
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * The community directory's rules for a theme. A theme's manifest is not a
 * plugin's: no id, no description, no isDesktopOnly, and the name cannot be
 * changed once the theme has been submitted. The files a submission needs -
 * theme.css, README, LICENSE, screenshot - are checked here too.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SEMVER = /^\d+\.\d+\.\d+$/;
/* Basic Latin, digits, spaces, and the three marks the directory allows. */
const NAME = /^[A-Za-z0-9 +()-]+$/;
const FORBIDDEN_IN_NAME = ['obsidian', 'obsi', 'sidian', 'theme'];

/* 512 x 288 is what the directory recommends; the thumbnail is scaled to it. */
const SCREENSHOT = 'screenshot.png';

async function json(name) {
  return JSON.parse(await fs.readFile(path.join(root, name), 'utf8'));
}

async function nonEmptyFile(name) {
  try {
    return (await fs.stat(path.join(root, name))).size > 0;
  } catch {
    return false;
  }
}

function url(value, field, problems) {
  if (value === undefined) return;
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:')
      problems.push(`${field} is not an HTTP or HTTPS URL: "${value}"`);
  } catch {
    problems.push(`${field} is not a valid URL: "${value}"`);
  }
}

async function main() {
  const manifest = await json('manifest.json');
  const problems = [];

  for (const field of ['name', 'version', 'minAppVersion', 'author']) {
    const value = manifest[field];
    if (typeof value !== 'string' || value.trim().length === 0)
      problems.push(`manifest is missing ${field}`);
  }

  for (const field of ['version', 'minAppVersion']) {
    const value = manifest[field];
    if (typeof value === 'string' && !SEMVER.test(value))
      problems.push(`${field} "${value}" is not MAJOR.MINOR.PATCH`);
  }

  /* A theme's manifest carries none of these; a copied plugin manifest does. */
  for (const field of ['id', 'description', 'isDesktopOnly']) {
    if (manifest[field] !== undefined) problems.push(`${field} belongs to a plugin, not a theme`);
  }

  const name = manifest.name ?? '';
  if (!NAME.test(name)) problems.push(`name "${name}" is not Basic Latin with - + ( ) only`);
  for (const word of FORBIDDEN_IN_NAME)
    if (name.toLowerCase().includes(word)) problems.push(`name "${name}" contains "${word}"`);

  url(manifest.authorUrl, 'authorUrl', problems);
  if (typeof manifest.fundingUrl === 'string') url(manifest.fundingUrl, 'fundingUrl', problems);
  else if (typeof manifest.fundingUrl === 'object' && manifest.fundingUrl !== null)
    for (const [label, value] of Object.entries(manifest.fundingUrl))
      url(value, `fundingUrl.${label}`, problems);

  for (const file of ['theme.css', 'README.md', 'LICENSE', SCREENSHOT])
    if (!(await nonEmptyFile(file))) problems.push(`${file} is missing or empty`);

  if (problems.length > 0) {
    for (const problem of problems) console.error(`Manifest: ${problem}`);
    process.exit(1);
  }
  console.log(`Manifest: ${manifest.name} ${manifest.version} satisfies the directory's rules.`);
}

await main();

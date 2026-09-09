#!/usr/bin/env node
/*
 * Skywalker - Theme for Obsidian
 * Copyright (c) 2026 theLOOP
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * The directory's hard rule: a theme reaches the network for nothing. Checked
 * against the built stylesheets, which are the files people install.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* Anything that fetches: url() in any property, and @import of a stylesheet. */
const REMOTE = /(?:url\(\s*['"]?|@import\s+(?:url\(\s*)?['"])(https?:|\/\/)/gi;

/** Blanks comments, keeping line breaks so a report still names the line. A
 *  Style Settings block is a comment, and it documents addresses as examples. */
function withoutComments(sheet) {
  return sheet.replace(/\/\*[\s\S]*?\*\//g, (block) => block.replace(/[^\n]/g, ' '));
}

async function sheets() {
  const found = ['theme.css'];
  for (const entry of await fs.readdir(path.join(root, 'snippets'), { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.css')) found.push(path.join('snippets', entry.name));
  }
  return found;
}

async function main() {
  const problems = [];
  let checked = 0;

  for (const name of await sheets()) {
    const sheet = withoutComments(await fs.readFile(path.join(root, name), 'utf8'));
    checked++;
    const lines = sheet.split('\n');
    lines.forEach((line, index) => {
      for (const match of line.matchAll(REMOTE)) {
        problems.push(`${name}:${index + 1} reaches the network: ${match[0]}`);
      }
    });
  }

  if (checked === 0) {
    console.error('Read no stylesheets; the check itself is broken.');
    process.exit(1);
  }

  if (problems.length > 0) {
    for (const problem of problems) console.error(`Assets: ${problem}`);
    process.exit(1);
  }
  console.log(`Assets: ${checked} stylesheets, none of them reach the network.`);
}

await main();

#!/usr/bin/env node
/*
 * Skywalker - Theme for Obsidian
 * Copyright (c) 2026 theLOOP
 * SPDX-License-Identifier: GPL-3.0-only
 *
 * Every class the theme styles has to come from somewhere. Almost all of them
 * are Style Settings switches, declared in the @settings block of the same
 * stylesheet; the rest are listed below with the reason they are not. A class
 * that matches neither is one nothing can ever put on the page, so the rules
 * behind it are dead - the shape a rename leaves when it misses a file.
 *
 * No CSS linter can see this: the tie between a selector and a @settings id is
 * this project's own.
 */

import { promises as fs } from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/* Classes with no switch behind them, and why each one is allowed to exist. */
const DECLARED_ELSEWHERE = new Map([]);

/** The @settings blocks: Style Settings reads them out of the CSS comment. */
function settingsBlocks(sheet) {
  return [...sheet.matchAll(/\/\*\s*@settings\b([\s\S]*?)\*\//g)].map((m) => m[1]);
}

/** Every name a switch can put on the page: an id, or one option's value. */
function declared(sheet) {
  const names = new Set();
  for (const block of settingsBlocks(sheet)) {
    for (const m of block.matchAll(/^\s*(?:id|value|default):\s*([A-Za-z0-9_-]+)\s*$/gm)) {
      names.add(m[1]);
    }
  }
  return names;
}

/** Every loopsk- class the stylesheet selects on, with the line it sits on. */
function selected(sheet) {
  const found = new Map();
  const lines = sheet.replace(/\/\*[\s\S]*?\*\//g, (b) => b.replace(/[^\n]/g, ' ')).split('\n');
  lines.forEach((line, index) => {
    const rule = line.split('{')[0];
    for (const m of rule.matchAll(/\.(loopsk-[a-z0-9-]+)/g)) {
      if (!found.has(m[1])) found.set(m[1], index + 1);
    }
  });
  return found;
}

async function sheets() {
  const found = ['theme.css'];
  for (const entry of await fs.readdir(path.join(root, 'snippets'), { withFileTypes: true })) {
    if (entry.isFile() && entry.name.endsWith('.css')) found.push(path.join('snippets', entry.name));
  }
  return found;
}

async function main() {
  const names = await sheets();
  const known = new Set(DECLARED_ELSEWHERE.keys());
  const uses = new Map();

  for (const name of names) {
    const sheet = await fs.readFile(path.join(root, name), 'utf8');
    for (const declaredName of declared(sheet)) known.add(declaredName);
    for (const [className, line] of selected(sheet)) {
      if (!uses.has(className)) uses.set(className, `${name}:${line}`);
    }
  }

  if (uses.size === 0) {
    console.error('Found no theme classes at all; the check itself is broken.');
    process.exit(1);
  }

  const orphans = [...uses].filter(([className]) => !known.has(className));
  if (orphans.length > 0) {
    for (const [className, where] of orphans) {
      console.error(`Classes: ${where} styles .${className}, which no setting can produce.`);
    }
    process.exit(1);
  }

  console.log(`Classes: ${uses.size} theme classes, each one a setting can produce.`);
}

await main();

# Skywalker

A dark theme for Obsidian. Nine flavours light and dark, fourteen accents, and
almost everything a switch in Style Settings.

![Skywalker](screenshot.png)

Source:
[theloop-am/obsidian-skywalker](https://github.com/theloop-am/obsidian-skywalker).

[![Check](https://github.com/theloop-am/obsidian-skywalker/actions/workflows/check.yml/badge.svg)](https://github.com/theloop-am/obsidian-skywalker/actions/workflows/check.yml)
[![Obsidian checks](https://github.com/theloop-am/obsidian-skywalker/actions/workflows/obsidian.yml/badge.svg)](https://github.com/theloop-am/obsidian-skywalker/actions/workflows/obsidian.yml)
[![OpenSSF Scorecard](https://api.securityscorecards.dev/projects/github.com/theloop-am/obsidian-skywalker/badge)](https://securityscorecards.dev/viewer/?uri=github.com/theloop-am/obsidian-skywalker)
![Obsidian](https://img.shields.io/badge/Obsidian-1.13.0+-483699?logo=obsidian&style=flat-square)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
## Contents

- [1 Installation](#1-installation)
- [2 Colours](#2-colours)
- [3 Settings](#3-settings)
- [4 The companion plugin](#4-the-companion-plugin)
- [5 What changed from AnuPpuccin](#5-what-changed-from-anuppuccin)
- [6 Quality](#6-quality)
- [7 Privacy](#7-privacy)
- [8 Development](#8-development)
- [9 Credits](#9-credits)
- [10 License](#10-license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## 1 Installation

In Obsidian: Settings → Appearance → Themes → Manage, then search for Skywalker.

By hand: download `theme.css` and `manifest.json` from the
[latest release](https://github.com/theloop-am/obsidian-skywalker/releases/latest)
and put them in `<vault>/.obsidian/themes/Skywalker/`.

Requires Obsidian 1.13.0 or later.

## 2 Colours

Nine flavours are built in: Latte, Solarized and Rosé Pine in light, and Mocha,
Macchiato, Frappé, Flexoki, AMOLED and Catppuccin's earlier Mocha in dark.
Fourteen accents are chosen separately, so the flavour and the colour it
highlights with are not one decision.

AMOLED is true black rather than a dark grey, for screens where that is the
difference between dark and off. It also goes over any other dark flavour, as a
highlight, as a border, or as both.

`snippets/extended-colorschemes.css` adds twenty-five more, light and dark — among
them Nord, Dracula, Gruvbox, Everforest, Kanagawa, Atom, Notion and Royal Velvet.
It is optional and separate: copy it into `<vault>/.obsidian/snippets/`.

## 3 Settings

Almost everything is a switch in
[Style Settings](https://github.com/mgmeyers/obsidian-style-settings) — the layout
of the tabs, the shape of the callouts, the checkboxes, the file browser colours,
the rainbow folders. Install that plugin and the theme's settings appear under it.

## 4 The companion plugin

[Skywalker Settings](https://github.com/theloop-am/obsidian-skywalker-settings)
adds what a stylesheet cannot draw for itself:

- **A starfield** on canvas, across the top of the window, and down either
  sidebar, onto empty tabs or behind the graph if you want it there.
- **A life calendar** behind the actions on a new tab: one cell for every week
  you have lived, and the weeks ahead.
- **Your own artwork** from the vault, which the theme then uses in place of its
  own mark.

More widgets will follow.

The theme is complete without it, and each of those has a fallback here. When the
plugin is installed it fills `--loopsk-vault-logo` and `--loopsk-banner-logo`,
and the theme reads them. That is the whole contract between the two.

## 5 What changed from AnuPpuccin

AnuPpuccin has had no release in two years, and Obsidian kept moving. This is that
theme brought up to the current app.

**It fits the Obsidian you are running.** Parts of AnuPpuccin styled things the app
no longer draws, and had quietly stopped doing anything at all. Whole features
waited on switches that were never added, so nobody ever saw them. What is left is
what actually reaches the screen, checked against Obsidian 1.13.

**It asks less of the app.** The theme leaned on selectors the browser has to
re-check on every change to the page — every keystroke, every pane you open. Most
of those are gone, which shows up first in Canvas, where that cost is highest.

**Your own styling wins.** The theme no longer forces its choices over yours. A
snippet you write, or another plugin's styling, takes effect without you having to
fight the theme for it.

**Things that were broken work.** Text fields and the search bar had lost their
shadow, and hover previews appeared abruptly instead of fading in. Both had been
that way since long before this fork, and neither is now.

## 6 Quality

Every change passes the same gates before it lands: the stylesheet is rebuilt from
`src/` and refused if the two disagree, [stylelint](https://stylelint.io/) reads
the SCSS under the modern SCSS ruleset and the built sheet under the ruleset the
community directory scans with, the manifest is checked against the directory's
rules, and one check of our own refuses a stylesheet that reaches the network.

`mise run check` is the whole set, and it runs again before every push.

## 7 Privacy

The theme makes no network requests. Every font and image it uses is inside the
stylesheet, so nothing about your reading reaches anyone, online or off.

## 8 Development

```bash
mise install && mise deps       # tools, then dependencies
mise run build                  # src/ into theme.css
mise run check                  # every gate
VAULT=/path/to/vault mise run theme:install
```

`theme.css` is committed because Obsidian installs it directly. It is built from
`src/`, never edited by hand, and `mise run test:build` fails when the two drift
apart.

## 9 Credits

Skywalker is derived from [AnuPpuccin](https://github.com/AnubisNekhet/AnuPpuccin)
by [Anubis](https://github.com/AnubisNekhet), imported at upstream commit
`82d207c` and modified since. Most of what is here is still that work. If you like
the foundation this is built on, consider
[supporting the original author](https://www.buymeacoffee.com/anubisnekhet).

## 10 License

GPL-3.0. See [LICENSE](LICENSE).

Copyright (C) 2022-2024 Anubis (AnubisNekhet) — original AnuPpuccin
Copyright (C) 2026 theLOOP

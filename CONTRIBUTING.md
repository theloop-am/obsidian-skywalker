<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
# Contributing

- [Contributing](#contributing)
  - [Bug reports](#bug-reports)
  - [Feature requests](#feature-requests)
  - [Pull requests](#pull-requests)
  - [Licence](#licence)
  - [Development](#development)
  - [Security issues](#security-issues)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Contributing

Thanks for wanting to help. The most useful contribution is a report from someone
who saw the theme look wrong somewhere, with enough detail to reproduce it.

### Bug reports

Open an issue with the Obsidian version, the theme version, your operating system,
and a screenshot. Say which Style Settings switches you have on: nearly every part
of this theme is behind one, and "the callouts look wrong" means something
different under Sleek than under Vanilla.

Say which plugins are involved if the problem is in a pane one of them draws. The
theme styles Kanban, Excalidraw, Notebook Navigator and others, and those change
under us.

### Feature requests

Open an issue describing what you want to see.

A theme is a stylesheet: it can change how something looks, and it cannot change
what Obsidian does. Anything that needs to measure, count or react belongs in the
[companion plugin](https://github.com/theloop-am/obsidian-skywalker-settings), and
a request that needs code will be pointed there.

### Pull requests

- **Edit `src/`, never `theme.css`.** The stylesheet is built from the sources and
  committed because Obsidian installs it directly. `mise run build` regenerates it
  and `mise run test:build` fails when the two disagree, so both go in the commit.
- **`mise run check` has to pass.** It is the whole set of gates, and the pre-push
  hook runs it anyway.
- **No remote assets.** A font or an image reached over the network is unavailable
  offline and tells whoever serves it that the reader opened their notes. Embed it,
  or leave it out. This one is a hard failure, not a warning.
- **`!important` and `:has()` are a last resort.** Both are already in here more
  than they should be. If the same result comes out of a selector that carries the
  weight on its own, write that instead; if it does not, say in the commit what you
  were beating.
- **Say how you checked it.** Which flavour, which switches, light and dark. A
  screenshot for anything visible.
- **Conventional commits.** The commit-msg hook enforces them.

### Licence

This theme is derived from AnuPpuccin and is GPL-3.0. Anything you contribute is
under the same licence, and the attribution at the top of `src/base.scss` and in
the README stays where it is — that is a condition of the licence, not a courtesy.

### Development

```bash
mise install && mise deps
mise run build
mise run check
mise run fmt
VAULT=/path/to/vault mise run theme:install
```

### Security issues

Do not open an issue. See [SECURITY.md](SECURITY.md).

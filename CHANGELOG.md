# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project
adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

The version in the heading, in `manifest.json`, in `package.json` and on the git tag is one number.
A release copies its section from this file and nothing is retyped: `mise run test:release` refuses a
release where those disagree.

<!-- How an entry is written:

- Categories are Added, Changed, Deprecated, Removed, Fixed and Security, in that order. A category
  with nothing under it is left out.
- One line per change, saying what changed - not what it is worth.
- Name things the way the interface names them, so a reader can go and find them.
- A fix says what was wrong. "Fixed a bug" matches nobody's problem.
- Write it for the person installing the update, not for the person who wrote the commit.

## [9.9.9] - 9090-09-09

### Added
### Changed
### Fixed

-->

## Unreleased

## [0.1.0] - 2026-09-10

### Added

- A dark, quiet theme built on Catppuccin's palettes, with a starlight ceiling across the top of the
  window and the workspace tuned to sit behind the writing rather than in front of it.
- Two CSS variables a companion plugin can fill with images from the vault, `--loopsk-vault-logo`
  and `--loopsk-banner-logo`, each falling back to the theme's own mark when nothing is set.

### Changed

- Derived from [AnuPpuccin](https://github.com/AnubisNekhet/AnuPpuccin), imported at upstream commit
  `82d207c` and maintained from there. The upstream project has had no release in two years; this
  fork exists to carry it forward.

# Security policy

## Supported versions

Fixes go into the next release. Older releases are not maintained separately.

## Reporting a vulnerability

Report it privately, through GitHub's private vulnerability reporting:
<https://github.com/theloop-am/obsidian-skywalker/security/advisories/new>.

If that is unavailable to you, open an issue asking for a private channel and leave
the details out of it.

Include the theme version, the Obsidian version, the platform, and how to reproduce
it. A report is reviewed before anything is disclosed publicly; when a fix is
released, the advisory says who reported it unless you would rather it did not.

## What a theme can reach

A theme is a stylesheet. It runs no code and reads no files. The one thing it can
do that touches the outside world is fetch a resource — a font, an image, a
stylesheet — and that is what `mise run test:assets` refuses: every font and image
is inside the stylesheet, and a rule that names an `http`, `https` or protocol-
relative address fails the build.

That check covers the snippets in this repository as well, because they ship here
and people copy them into their vaults.

If you find a released `theme.css` that reaches the network, that is a security
report and the section above is how to send it.

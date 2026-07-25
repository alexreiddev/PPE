# PPE

Design skill library and project context for the **Oasis Star General Trading** PPE
catalogue and enquiry site.

- Live preview: `oasis-star.netlify.app`
- Target domain: `oasisstargt.com` (DNS switch pending)
- Project context and settled decisions: [`docs/project-handoff.md`](docs/project-handoff.md)
- Skill routing and design guardrails: [`CLAUDE.md`](CLAUDE.md)

The site source itself is not in this repo yet — it lives outside as `oasis-star.zip`.
This repo currently carries the skills and the written context.

## What's vendored

`.claude/skills/` holds all 13 skills from **Taste Skill** by Leon Lin
([`Leonxlnx/taste-skill`](https://github.com/Leonxlnx/taste-skill) ·
[tasteskill.dev](https://www.tasteskill.dev/)) — "the anti-slop frontend framework":
instruction files that stop AI agents from producing generic, templated frontend design.

Pinned at upstream commit `e988add20dab0fa97d7a76781c48961c8184288e` (2026-07-23).
Copied **verbatim** — no frontmatter or content edits — so re-syncing stays a plain copy.

Licensed MIT, `Copyright (c) 2026 Leonxlnx`; the upstream licence is retained at
[`.claude/skills/LICENSE`](.claude/skills/LICENSE).

| Directory → slash command | Upstream `name:` | Role |
| --- | --- | --- |
| `taste-skill` | `design-taste-frontend` | flagship v2; three dials (variance / motion / density) |
| `taste-skill-v1` | `design-taste-frontend-v1` | original v1, kept for exact back-compat |
| `gpt-tasteskill` | `gpt-taste` | stricter GPT/Codex-oriented variant |
| `image-to-code-skill` | `image-to-code` | generate references → analyse → implement |
| `redesign-skill` | `redesign-existing-projects` | audit-first upgrade of an existing UI |
| `soft-skill` | `high-end-visual-design` | premium and calm, softer contrast |
| `minimalist-skill` | `minimalist-ui` | editorial Notion/Linear |
| `brutalist-skill` | `industrial-brutalist-ui` | Swiss/terminal, extreme scale contrast |
| `stitch-skill` | `stitch-design-taste` | Google Stitch rules (bundles `DESIGN.md`) |
| `output-skill` | `full-output-enforcement` | anti-truncation, no placeholder comments |
| `imagegen-frontend-web` | `imagegen-frontend-web` | web comps — images only, no code |
| `imagegen-frontend-mobile` | `imagegen-frontend-mobile` | mobile screens — images only, no code |
| `brandkit` | `brandkit` | brand identity boards — images only, no code |

`.claude/skills/llms.txt` is upstream's one-line index of all 13. It isn't a skill
directory, so skill discovery ignores it; it's kept so the mirror matches upstream.

## Using them

The skills load automatically for any Claude Code session started in this repo, and
Claude picks one when a task calls for it. Invoke one explicitly with its **directory
name**: `/redesign-skill`, `/taste-skill`, `/soft-skill`, and so on.

Note the directory name — not the frontmatter `name` — is the slash command. For
project skills the frontmatter `name` is only a display name; the `name`-as-command
behaviour applies to plugin skills. Upstream's `name:` values are the `npx skills add`
install names.

See [`CLAUDE.md`](CLAUDE.md) for which skill to reach for, and for the Oasis Star design
guardrails the skills must respect. **Default here is `/redesign-skill`** — the site
already exists and has a client-approved design system.

## Why vendored rather than installed

Committing the skills is what makes them available to Claude Code cloud sessions and
scheduled routines: those load project skills from the cloned repository's
`.claude/skills/` and do **not** read `~/.claude/skills/` on any local machine.

For other projects, upstream's own installer is the easier route:

```bash
npx skills add https://github.com/Leonxlnx/taste-skill
# or a single skill, by its frontmatter name (not its folder name):
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

## Re-syncing from upstream

Nothing was modified, so this stays a plain copy:

```bash
git clone --depth 1 https://github.com/Leonxlnx/taste-skill /tmp/taste-skill
cp -R /tmp/taste-skill/skills/. .claude/skills/
cp /tmp/taste-skill/LICENSE .claude/skills/LICENSE
```

Then bump the pinned commit recorded above. To confirm no local drift before syncing:

```bash
diff -r /tmp/taste-skill/skills .claude/skills --exclude=LICENSE
```

If you ever do edit a skill locally — the `taste-skill` dials are the likely case —
record it here, because the copy above will silently revert it.

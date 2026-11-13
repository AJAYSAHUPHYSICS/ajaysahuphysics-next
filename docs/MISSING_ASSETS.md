# Missing Assets

Content files the site expects but that don't exist yet. The site hides
anything that depends on them, so students never see a broken link. This
page is the record of what to add.

## Notes PDFs

Each chapter's **Notes** page shows a "Download PDF" link only when its PDF
exists in `public/notes-pdf/`. The check runs at build time
(`src/lib/notes-pdf.ts`).

| Chapter | Class | Expected file | Page affected | Since |
|---|---|---|---|---|
| Electromagnetic Induction | 12 | `public/notes-pdf/class-12/electromagnetic-induction.pdf` | `/class-12/electromagnetic-induction/notes/` | 2026-11-13 (P1-4, D-2) |
| Wave Optics | 12 | `public/notes-pdf/class-12/wave-optics.pdf` | `/class-12/wave-optics/notes/` | 2026-11-13 (P1-4, D-2) |
| Semiconductor Electronics | 12 | `public/notes-pdf/class-12/semiconductor-electronics.pdf` | `/class-12/semiconductor-electronics/notes/` | 2026-11-13 (P1-4, D-2) |

The typed notes on these pages are complete and unaffected; only the
downloadable PDF is missing.

### How to restore a PDF

1. Add the file with **exactly** the name above (lowercase, hyphenated, `.pdf`).
2. Build the site (`npm run build`). The "Download PDF" link reappears on that
   chapter's Notes page automatically. No code change is needed.
3. Remove the row from this table in the same pull request.

CI (`scripts/verify-build.mjs`) checks every PDF link in the built site, so a
link to a file that doesn't exist can't reach production.

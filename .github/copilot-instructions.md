# Project Guidelines

## Instruction Behavior
- These guidelines are default preferences for this workspace and may be overridden by explicit task requests.

## Scope
- This repository is a static personal portfolio site built with HTML, CSS, and vanilla JavaScript.
- Prefer minimal, surgical edits that preserve the existing layout, class names, and section structure in `index.html`.

## Code Style
- Match existing formatting in each file (indentation, spacing, and attribute ordering).
- Keep class and ID names consistent with existing naming patterns.
- Reuse existing CSS variables and utility patterns in `assets/css/style.css` before adding new styles.

## Frontend Conventions
- Use relative asset paths under `assets/`.
- Do not modify vendor files under `assets/css/vendor/` and `assets/js/vendor/` unless explicitly requested.
- For behavior changes, prefer updating `assets/js/main.js` over adding new JavaScript files.

## Content Safety
- Preserve existing personal/contact information unless the task explicitly asks to change it.
- Ask for explicit confirmation before editing personal/contact text in `index.html`.
- Avoid introducing placeholder text for production-facing sections.

## Validation
- For UI changes, verify in-browser behavior and confirm there are no broken links or missing assets.
- If no automated tests exist, provide concise manual verification steps.
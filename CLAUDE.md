# CLAUDE.md

Claude reads this file at the start of every session. It's your project's standing brief: who it's for, what it is, and the house rules. Fill in the sections marked ✏️ before you ask Claude to build anything, and update them as the project changes.

## ✏️ About this project

- **What we're building:** The Wizzard Dispatch, a one-page interactive newsletter. Each story is a full-screen section, and as you scroll the background colour and a brand shape (orb, hanging circles, tiles, a counting number, a line network, a speech bubble) animate to match the story.
- **Who it's for:** Colleagues and the bootcamp group, reading on a laptop or a phone.
- **What "done" looks like today:** Issue 11 live on Vercel: a cover with contents, five stories and a sign-off, working smoothly on phone and laptop.

## ✏️ Look and feel

- **Brand:** Wizzard. Navy `#041E42` / `#041E4B` and paper `#F8F8F8` backgrounds, hot pink `#FF2EA6` as the one accent, and the diagonal pink-to-blue brand gradient. Inter Black for headlines, Montserrat for everything you read. Flat colour, no drop shadows on cards, 16px rounded corners.
- **Tone:** Wizzard tone of voice: friendly, energetic, succinct. British English, sentence-case headings, "we" and "you", no Oxford comma, spaced en dashes, no exclamation marks, no emoji.
- **Reference:** The Wizzard credentials deck: one big idea per screen, headline, short pink rule, one lead paragraph, then bullets.

## How the newsletter works

- `index.html` holds the content. Each story is a `<section class="story">` with an `id` (used by the contents list and the side rail), a `data-scene` (which shape shows) and a `data-ground` (`paper`, `navy` or `gradient`).
- `styles.css` holds the colours as variables at the top, then the backdrop shapes, then a "scene choreography" block that says which shape appears in which scene.
- `script.js` watches the scroll, works out which story is in the middle of the screen, and switches the scene. It also drives the progress bar, the 0–26 counter and the copy-link button.
- To add a story: copy a `<section class="story">`, give it a new `id`, pick a scene and ground, and add a matching link to the cover contents and the side rail.
- Keep alternating grounds (paper, navy, gradient) so each change of story is visible. Text on the gradient sits on a translucent navy panel so it stays readable.
- Animations switch off for anyone with "reduce motion" turned on. Keep it that way.

## About me

I'm not a developer. Explain what you're doing in plain English, keep explanations short, and avoid jargon. If you use a technical term, explain it in a few words.

## House rules

### How the project is built
- Plain HTML, CSS and JavaScript only. No frameworks, no build step and no npm packages unless I ask for them.
- `index.html` is the home page. Keep the project to a handful of files.
- The site is hosted on Vercel, which serves these files exactly as they are. Nothing needs installing or compiling.
- There is no server or database. If something needs saving, use the browser's localStorage, and tell me plainly that it only saves on this device and this browser.

### Data and safety
- This site is public. Anyone with the link can see it, and the code is on GitHub.
- Use made-up data only. Never add real client, product, patient or colleague information, even if I paste it in by mistake. If I do, stop and point it out.
- Never add passwords, API keys or other secrets.
- Keep the footer line that says this is a training exercise.

### Quality
- Make it work well on a phone as well as a laptop.
- Make it accessible: good colour contrast, alt text on images, real headings and buttons.
- Fonts from Google Fonts are fine. Images should be ones you draw yourself (SVG or CSS) or plain placeholders.

### How to work with me
- Before a big change, tell me what you plan to do in two or three bullet points.
- After each change, tell me in one or two sentences what changed and how to see it.
- Commit with short, clear messages that a non-developer would understand.
- If I ask for something that breaks these rules, say so and suggest the nearest thing that doesn't.

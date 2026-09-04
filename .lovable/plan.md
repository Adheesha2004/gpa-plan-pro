# Group Project Document — UniGPA

Generate a single, professional **PDF document** (`UniGPA_Group_Document.pdf`) covering all required submission sections.

## Content sections (in order)

1. **Cover / header** — Group number (placeholder `Group [XX]` for you to confirm) and project title: *UniGPA – Student GPA Calculator & Planner*.
2. **Members table** — every member's name + index number, with leader/nominated submitter marked. Placeholder rows will be included for you to fill in, unless you provide the list.
3. **Problem, intended users & summary** — students manually compute weighted GPA and can't easily forecast outcomes; intended users: university students; short summary of the app.
4. **Main features** — Add Subject form (name/credits/grade), editable subjects table, Calculate GPA button, GPA result card, total credits & subject count, What-If GPA projection with delta, grade-point reference, responsive desktop/mobile UI, input validation, fully client-side (no backend).
5. **Technologies/tools used** — React 19, TypeScript, TanStack Start (Vite 7), TanStack Router, Tailwind CSS v4, shadcn-style components, Space Grotesk/IBM Plex Mono fonts; built with Lovable AI.
6. **All prompts used** — the original build prompt (features, What-If, responsiveness, validation, client-side, clean components) and the follow-up prompts (GitHub deployment question, this document request), reproduced in full.
7. **Other AI-generated actions/inputs** — Lovable agent actions: design system + theme token generation, component scaffolding (SubjectForm, SubjectTable, GpaResultCard, WhatIfPanel, GradeReference), calculation module (gpa.ts), automated preview verification (desktop + mobile rendering, GPA math check, validation-error check), SEO metadata. Note: no voice instructions, screenshots, or uploaded files were used.
8. **Testing note** — verified before submission: GPA math correctness (Σcredits×points ÷ Σcredits, e.g. 52.0 ÷ 14 = 3.71), empty/invalid input handling, What-If projection and reset, responsive layout on desktop and mobile viewports.

## Technical details

- Generated with reportlab (DejaVu Sans font for clean typography), US Letter, branded in the app's green/gold academic palette.
- QA: convert every page to an image and visually inspect for overflow/clipping before delivering.
- Output saved to `/mnt/documents/UniGPA_Group_Document.pdf` and attached in chat.

## Note

Group number and member names/index numbers are unknown — the PDF will include clearly marked placeholders (e.g. `[Group No]`, `[Name – Index No]`) so you can tell me the real values and I'll issue a final version. Alternatively, provide them in your next message.

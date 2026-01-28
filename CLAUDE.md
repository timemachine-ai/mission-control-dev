# Project: Mission Control (The Video IDE)

## 1. Vision
We are building a browser-based Integrated Development Environment (IDE) for programmatic video.
- **Goal:** Users describe a video, and the AI generates the React/Remotion code to render it instantly.
- **Key Difference:** We do not generate MP4s. We generate **Code** that renders Lottie files and React components.

## 2. Tech Stack (Strict)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Dark Mode: #1e1e1e)
- **Execution Engine:** @codesandbox/sandpack-react (Running Node.js in browser)
- **Video Engine:** Remotion (v4.0.100)

## 3. Architecture Rules
- **Sandpack is King:** All video code runs *inside* the Sandpack virtual browser, not the Next.js app.
- **Explicit Dependencies:** Always define `package.json` inside Sandpack's `files` prop to prevent version conflicts.
- **No Cross-Origin Errors:** `next.config.js` MUST have `Cross-Origin-Embedder-Policy: require-corp` enabled at all times.
- **The "Smart Asset" Pattern:** We prefer using Lottie JSON files for complex animations and React for text/layout.

## 4. Current Status
- **Sprint 1 (Complete):** Engine is running. Sandpack loads a Remotion player with "Mission Control" text.
- **Sprint 2 (Next):** UI Polish. We need to make it look like VS Code (Monaco Editor, File Explorer, Resizable panels).

## 5. Coding Style
- **Components:** Functional React components.
- **Styling:** Tailwind for the outer app, standard CSS/style-props for inside the Sandpack video.
- **Safety:** Never remove the `files` prop from Sandpack, or the engine crashes.

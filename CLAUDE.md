# Project: Mission Control (The Video IDE)

## 1. Vision

We are building a **browser-based Integrated Development Environment (IDE)** for programmatic video creation.

### What This Means
- **Goal:** Users describe a video in natural language, and AI generates the React/Remotion code to render it instantly in the browser.
- **Key Difference:** We do NOT generate MP4 files. We generate **live, editable Code** that renders Lottie animations and React components in real-time.
- **Think of it as:** VS Code + After Effects, but everything is code-first and runs in the browser.

### Why This Matters
Traditional video editing is timeline-based and non-programmable. Mission Control treats video as **code**, meaning:
- Videos can be version-controlled (Git)
- Components can be reused across projects
- AI can generate and modify video logic
- Real-time preview without rendering

---

## 2. Tech Stack (Strict - Do Not Deviate)

| Layer | Technology | Version | Purpose |
|-------|------------|---------|---------|
| Framework | Next.js | 15.x | App Router, SSR, API routes |
| Language | TypeScript | 5.x | Type safety everywhere |
| Styling | Tailwind CSS | 3.x | UI styling (Dark Mode: `#1e1e1e`) |
| Execution Engine | @codesandbox/sandpack-react | Latest | In-browser Node.js runtime |
| Video Engine | Remotion | 4.0.100 | React-based video rendering |
| Animation | Lottie (lottie-react) | Latest | Complex vector animations |

### Why These Specific Choices
- **Sandpack:** Runs a full Node.js environment in the browser. No backend needed for code execution.
- **Remotion:** Treats video frames as React components. Each frame is a function of time.
- **Lottie:** Designer-friendly animations exported from After Effects as JSON.

---

## 3. Architecture Rules (Critical)

### Rule 1: Sandpack is King
All video code runs **inside** the Sandpack virtual browser environment, NOT in the Next.js app itself. We use Sandpack's built-in CodeMirror editor (via SandpackCodeEditor) instead of Monaco to keep the bundle lightweight.

```
┌─────────────────────────────────────────────────┐
│ Next.js App (The IDE Shell)                     │
│  ├── SandpackCodeEditor (code editing)          │
│  ├── Custom File Explorer (project files)       │
│  └── SandpackPreview                            │
│       └── Virtual Browser                       │
│            └── Remotion Player (video renders)  │
└─────────────────────────────────────────────────┘
```

### Rule 2: Explicit Dependencies
**Always** define `package.json` inside Sandpack's `files` prop. Never rely on implicit dependencies.

```tsx
// CORRECT - Explicit package.json
<SandpackProvider
  files={{
    "/package.json": JSON.stringify({
      dependencies: {
        "remotion": "4.0.100",
        "react": "18.2.0",
        "@remotion/player": "4.0.100"
      }
    }),
    "/App.tsx": "..."
  }}
/>

// WRONG - Missing package.json = version conflicts
<SandpackProvider files={{ "/App.tsx": "..." }} />
```

### Rule 3: Cross-Origin Headers (Non-Negotiable)
`next.config.js` **MUST** have these headers or SharedArrayBuffer fails and video won't render:

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Cross-Origin-Embedder-Policy", value: "require-corp" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};
export default nextConfig;
```

### Rule 4: The "Smart Asset" Pattern
- **Lottie JSON** = Complex animations (characters, effects, motion graphics)
- **React Components** = Text, layout, data-driven content
- **Static Assets** = Images, fonts (served from `/public`)

---

## 4. Project Structure

```
mission-control/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout (dark theme)
│   │   ├── page.tsx            # Main IDE page (SandpackProvider)
│   │   └── globals.css         # Tailwind + Sandpack overrides
│   ├── components/
│   │   └── ide/                # IDE shell components
│   │       ├── Sidebar.tsx     # Left icon bar (Explorer, Search, AI, Settings)
│   │       ├── ActivityBar.tsx # Bottom status bar
│   │       ├── FileExplorer.tsx# Project file tree (uses useSandpack hook)
│   │       └── index.ts        # Barrel exports
│   └── lib/
│       ├── sandpack/           # Sandpack configuration
│       └── templates/          # Default video templates
├── public/                     # Static assets
├── next.config.js              # MUST have COOP/COEP headers
├── tailwind.config.js
└── package.json
```

---

## 5. Current Sprint Status

### Sprint 0: Setup (Current)
- [ ] Create Next.js project with TypeScript, Tailwind, App Router
- [ ] Configure Cross-Origin headers in next.config.js
- [ ] Verify project runs without errors

### Sprint 1: Engine Foundation
- [ ] Integrate Sandpack with Remotion
- [ ] Create basic video template
- [ ] Render "Mission Control" text in Remotion Player

### Sprint 2: UI Polish
- [x] SandpackCodeEditor integration (VS Code feel, lightweight)
- [ ] Resizable panels (editor | preview)
- [x] File explorer sidebar (custom component using useSandpack)
- [x] Dark theme matching VS Code
- [x] Sidebar with icons (Explorer, Search, AI, Settings)
- [x] Status bar (ActivityBar)

### Sprint 3: AI Integration
- [ ] Connect to AI for code generation
- [ ] Natural language to Remotion code
- [ ] Live preview updates

---

## 6. Coding Style Guide

### Components
- **Functional components only** (no class components)
- **Named exports** for components
- **Props interface** defined above component

```tsx
interface VideoPreviewProps {
  code: string;
  isPlaying: boolean;
}

export function VideoPreview({ code, isPlaying }: VideoPreviewProps) {
  return <div>...</div>;
}
```

### Styling
- **Tailwind CSS** for the Next.js app (IDE shell)
- **Inline styles or CSS modules** inside Sandpack video code
- **Dark Mode Default:** Background `#1e1e1e`, Text `#d4d4d4`

### File Naming
- Components: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Constants: `UPPER_SNAKE_CASE`

---

## 7. Common Pitfalls & Solutions

### Pitfall 1: "SharedArrayBuffer is not defined"
**Cause:** Missing Cross-Origin headers
**Fix:** Verify `next.config.js` has COOP/COEP headers. Restart dev server.

### Pitfall 2: Sandpack crashes with no error
**Cause:** Missing `files` prop or empty `package.json`
**Fix:** Always include explicit `files` prop with valid `package.json`

### Pitfall 3: Remotion video blank/white
**Cause:** Component not exported correctly or wrong entry point
**Fix:** Ensure `index.tsx` exports the composition properly

### Pitfall 4: Styles not applying in video
**Cause:** Tailwind doesn't work inside Sandpack
**Fix:** Use inline styles or include CSS in Sandpack files

---

## 8. Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type check
npx tsc --noEmit
```

---

## 9. Key Dependencies Reference

```json
{
  "dependencies": {
    "next": "15.x",
    "react": "18.x",
    "react-dom": "18.x",
    "@codesandbox/sandpack-react": "latest",
    "remotion": "4.0.100",
    "@remotion/player": "4.0.100",
    "lottie-react": "latest",
    "lucide-react": "latest"
  },
  "devDependencies": {
    "typescript": "5.x",
    "tailwindcss": "3.x",
    "@types/react": "18.x",
    "@types/node": "20.x"
  }
}
```

---

## 10. Quick Reference for Claude

When working on this project, always remember:

1. **Never remove the `files` prop from Sandpack** - The engine will crash
2. **Always check next.config.js headers** - Video won't work without them
3. **Sandpack code is separate from Next.js code** - They're different environments
4. **Test in browser after every change** - Sandpack errors aren't always visible in terminal
5. **Remotion version must match** - `remotion` and `@remotion/player` must be same version

---

*Last Updated: Sprint 0 - Foundation Setup*

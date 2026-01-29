/**
 * Base Remotion Template for Sandpack
 *
 * Structure (mirrors real Remotion project in VS Code):
 * /App.tsx              ← Sandpack-only: Preview wrapper using @remotion/player
 * /src/
 *   ├── Composition.tsx ← Main composition (AI edits this)
 *   ├── Root.tsx        ← Registers compositions
 *   ├── index.ts        ← Entry point
 *   ├── index.css       ← Styles
 *   └── scenes/         ← AI creates scene files here (empty by default)
 *
 * NOTE: Agent-skill files are kept in src/lib/agent-skills/ for AI reference
 * but are NOT included in Sandpack.
 */

// Import source files
import {
  appFile,
  compositionFile,
  rootFile,
  indexEntryFile,
  stylesFile,
} from "./files/src-files";

// Type for Sandpack files object
export type SandpackFiles = Record<string, string>;

/**
 * Sandpack files - Clean structure matching real Remotion projects
 *
 * App.tsx is the ONLY file outside /src/ - it exists solely for Sandpack preview.
 * Everything else is in /src/ just like a real Remotion project.
 */
export const baseRemotionFiles: SandpackFiles = {
  // Sandpack preview wrapper (imports from /src/Composition.tsx)
  "/App.tsx": appFile,

  // All Remotion files live in /src/ - just like VS Code
  "/src/Composition.tsx": compositionFile,
  "/src/Root.tsx": rootFile,
  "/src/index.ts": indexEntryFile,
  "/src/index.css": stylesFile,
};

/**
 * Sandpack custom setup for Remotion projects
 * IMPORTANT: Using 4.0.100 with React 18 - these are the WORKING versions
 */
export const baseRemotionDependencies = {
  remotion: "4.0.100",
  "@remotion/player": "4.0.100",
  react: "18.2.0",
  "react-dom": "18.2.0",
};

/**
 * Default active file when opening the editor
 */
export const defaultActiveFile = "/src/Composition.tsx";

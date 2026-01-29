/**
 * Base Remotion Template for Sandpack
 *
 * This module exports all files needed to run a Remotion project
 * inside the Sandpack virtual browser environment.
 *
 * NOTE: Agent-skill files are kept in src/lib/agent-skills/ for AI reference
 * but are NOT included in Sandpack to avoid overwhelming the bundler.
 */

// Import source files
import {
  appFile,
  myCompFile,
  compositionFile,
  rootFile,
  indexEntryFile,
  stylesFile,
} from "./files/src-files";

// Type for Sandpack files object
export type SandpackFiles = Record<string, string>;

/**
 * Sandpack files - ONLY the essential files needed for Remotion to work
 * Keep this minimal to avoid bundler timeouts
 */
export const baseRemotionFiles: SandpackFiles = {
  // Main App entry point (what Sandpack renders with Remotion Player)
  "/App.tsx": appFile,

  // MyComp - The composition rendered by App.tsx (MUST be at root level)
  "/MyComp.tsx": myCompFile,

  // Remotion source files
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

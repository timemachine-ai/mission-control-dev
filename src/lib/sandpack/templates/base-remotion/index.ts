/**
 * Base Remotion Template for Sandpack
 *
 * This module exports all files needed to run a Remotion project
 * inside the Sandpack virtual browser environment.
 *
 * File Structure in Sandpack:
 * /
 * ├── package.json
 * ├── src/
 * │   ├── Composition.tsx
 * │   ├── Root.tsx
 * │   ├── index.ts
 * │   └── index.css
 * └── agent-skill/
 *     ├── SKILL.md
 *     └── rules/
 *         ├── *.md (all rule files)
 *         └── assets/
 *             └── *.tsx (example code)
 */

// Import source files
import {
  appFile,
  compositionFile,
  rootFile,
  indexEntryFile,
  stylesFile,
  packageJsonFile,
} from "./files/src-files";

// Import skill file
import { skillFile } from "./files/skill-file";

// Import all rule files
import {
  rule3d,
  ruleAnimations,
  ruleAssets,
  ruleAudio,
  ruleCalculateMetadata,
  ruleCanDecode,
  ruleCharts,
  ruleCompositions,
  ruleDisplayCaptions,
  ruleExtractFrames,
  ruleFonts,
  ruleGetAudioDuration,
  ruleGetVideoDimensions,
  ruleGetVideoDuration,
  ruleGifs,
  ruleImages,
  ruleImportSrtCaptions,
  ruleLottie,
  ruleMaps,
  ruleMeasuringDomNodes,
  ruleMeasuringText,
  ruleParameters,
  ruleSequencing,
  ruleTailwind,
  ruleTextAnimations,
  ruleTiming,
  ruleTranscribeCaptions,
  ruleTransitions,
  ruleTrimming,
  ruleVideos,
} from "./files/rules-files";

// Import asset files
import {
  chartsBarChart,
  textAnimationsTypewriter,
  textAnimationsWordHighlight,
} from "./files/assets-files";

// Type for Sandpack files object
export type SandpackFiles = Record<string, string>;

/**
 * Complete Sandpack files configuration for base Remotion template
 * Includes ALL files from base-remotion-assets
 */
export const baseRemotionFiles: SandpackFiles = {
  // Main App entry point (what Sandpack renders with Remotion Player)
  "/App.tsx": appFile,

  // Package.json
  "/package.json": packageJsonFile,

  // Remotion source files
  "/src/Composition.tsx": compositionFile,
  "/src/Root.tsx": rootFile,
  "/src/index.ts": indexEntryFile,
  "/src/index.css": stylesFile,

  // Agent skill main file
  "/agent-skill/SKILL.md": skillFile,

  // All rule files
  "/agent-skill/rules/3d.md": rule3d,
  "/agent-skill/rules/animations.md": ruleAnimations,
  "/agent-skill/rules/assets.md": ruleAssets,
  "/agent-skill/rules/audio.md": ruleAudio,
  "/agent-skill/rules/calculate-metadata.md": ruleCalculateMetadata,
  "/agent-skill/rules/can-decode.md": ruleCanDecode,
  "/agent-skill/rules/charts.md": ruleCharts,
  "/agent-skill/rules/compositions.md": ruleCompositions,
  "/agent-skill/rules/display-captions.md": ruleDisplayCaptions,
  "/agent-skill/rules/extract-frames.md": ruleExtractFrames,
  "/agent-skill/rules/fonts.md": ruleFonts,
  "/agent-skill/rules/get-audio-duration.md": ruleGetAudioDuration,
  "/agent-skill/rules/get-video-dimensions.md": ruleGetVideoDimensions,
  "/agent-skill/rules/get-video-duration.md": ruleGetVideoDuration,
  "/agent-skill/rules/gifs.md": ruleGifs,
  "/agent-skill/rules/images.md": ruleImages,
  "/agent-skill/rules/import-srt-captions.md": ruleImportSrtCaptions,
  "/agent-skill/rules/lottie.md": ruleLottie,
  "/agent-skill/rules/maps.md": ruleMaps,
  "/agent-skill/rules/measuring-dom-nodes.md": ruleMeasuringDomNodes,
  "/agent-skill/rules/measuring-text.md": ruleMeasuringText,
  "/agent-skill/rules/parameters.md": ruleParameters,
  "/agent-skill/rules/sequencing.md": ruleSequencing,
  "/agent-skill/rules/tailwind.md": ruleTailwind,
  "/agent-skill/rules/text-animations.md": ruleTextAnimations,
  "/agent-skill/rules/timing.md": ruleTiming,
  "/agent-skill/rules/transcribe-captions.md": ruleTranscribeCaptions,
  "/agent-skill/rules/transitions.md": ruleTransitions,
  "/agent-skill/rules/trimming.md": ruleTrimming,
  "/agent-skill/rules/videos.md": ruleVideos,

  // Asset example files
  "/agent-skill/rules/assets/charts-bar-chart.tsx": chartsBarChart,
  "/agent-skill/rules/assets/text-animations-typewriter.tsx": textAnimationsTypewriter,
  "/agent-skill/rules/assets/text-animations-word-highlight.tsx": textAnimationsWordHighlight,
};

/**
 * Sandpack custom setup for Remotion projects
 */
export const baseRemotionDependencies = {
  "@remotion/cli": "4.0.410",
  "@remotion/player": "4.0.410",
  remotion: "4.0.410",
  react: "19.2.3",
  "react-dom": "19.2.3",
  "@remotion/tailwind-v4": "4.0.410",
  tailwindcss: "4.0.0",
};

/**
 * Default active file when opening the editor
 */
export const defaultActiveFile = "/src/Composition.tsx";

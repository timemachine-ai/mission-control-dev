/**
 * Source files for Remotion project
 *
 * Structure (mirrors real Remotion project):
 * /App.tsx              ← Sandpack-only: Preview wrapper using @remotion/player
 * /src/
 *   ├── Composition.tsx ← Main composition (AI edits this)
 *   ├── Root.tsx        ← Registers compositions
 *   ├── index.ts        ← Entry point
 *   ├── index.css       ← Styles
 *   └── scenes/         ← AI creates scene files here
 */

// App.tsx - Sandpack preview wrapper
// This file ONLY exists because Sandpack can't run "remotion studio"
// It imports directly from /src/Composition.tsx - the single source of truth
export const appFile = `import { Player } from "@remotion/player";
import { MyComposition } from "./src/Composition";

export default function App() {
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#1e1e1e", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Player
        component={MyComposition}
        durationInFrames={120}
        compositionWidth={1920}
        compositionHeight={1080}
        fps={30}
        controls
        style={{ width: "100%", maxWidth: 800 }}
      />
    </div>
  );
}
`;

// /src/Composition.tsx - THE main composition file
// This is the ONLY composition file. AI edits this.
export const compositionFile = `import { AbsoluteFill, useCurrentFrame } from "remotion";

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const opacity = Math.min(1, frame / 30);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: 80,
          color: "black",
          fontFamily: "sans-serif",
          opacity,
        }}
      >
        Mission Control
      </h1>
      <p
        style={{
          fontSize: 30,
          color: "#666",
          fontFamily: "sans-serif",
          opacity,
        }}
      >
        Frame: {frame}
      </p>
    </AbsoluteFill>
  );
};
`;

export const rootFile = `import "./index.css";
import { Composition } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={60}
        fps={30}
        width={1280}
        height={720}
      />
    </>
  );
};
`;

export const indexEntryFile = `import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
`;

export const stylesFile = `/* Global styles for Mission Control videos */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`;

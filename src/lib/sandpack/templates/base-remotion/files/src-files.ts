/**
 * Source files for Remotion project
 * These are the core files that make up the Remotion video project
 */

// App.tsx - Main entry point for Sandpack with Remotion Player
// IMPORTANT: Must import from ./MyComp (root level) for Sandpack to resolve correctly
export const appFile = `import { Player } from "@remotion/player";
import { MyComp } from "./MyComp";

export default function App() {
  return (
    <div style={{ width: "100%", height: "100vh", backgroundColor: "#1e1e1e", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Player
        component={MyComp}
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

// MyComp.tsx - The main composition that App.tsx renders via Player
// This MUST be at root level (not in /src) for Sandpack imports to work
export const myCompFile = `import { AbsoluteFill, useCurrentFrame } from "remotion";

export const MyComp = () => {
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

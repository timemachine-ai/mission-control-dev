/**
 * Source files for Remotion project
 * These are the core files that make up the Remotion video project
 */

// App.tsx - Main entry point for Sandpack with Remotion Player
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

export const stylesFile = `@import "tailwindcss";
`;

export const packageJsonFile = `{
  "name": "remotion-project",
  "version": "1.0.0",
  "description": "My Remotion video",
  "private": true,
  "dependencies": {
    "@remotion/cli": "4.0.410",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "remotion": "4.0.410",
    "@remotion/tailwind-v4": "4.0.410",
    "tailwindcss": "4.0.0"
  },
  "devDependencies": {
    "@types/react": "19.2.7",
    "typescript": "5.9.3"
  }
}
`;

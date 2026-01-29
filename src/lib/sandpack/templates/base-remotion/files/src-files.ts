/**
 * Source files for Remotion project
 * These are the core files that make up the Remotion video project
 */

export const compositionFile = `export const MyComposition = () => {
  return null;
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

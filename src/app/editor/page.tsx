'use client';

import { useEffect, useRef } from 'react';
import sdk from '@stackblitz/sdk';

// Remotion project files - clean structure just like VS Code
const REMOTION_FILES = {
  'src/Composition.tsx': `import { AbsoluteFill, useCurrentFrame } from "remotion";

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
`,

  'src/Root.tsx': `import { Composition } from "remotion";
import { MyComposition } from "./Composition";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MyComposition}
        durationInFrames={120}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
`,

  'src/index.ts': `import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
`,

  'src/index.css': `/* Global styles */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
`,

  'package.json': `{
  "name": "remotion-project",
  "version": "1.0.0",
  "scripts": {
    "dev": "remotion studio",
    "build": "remotion render"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "remotion": "^4.0.100",
    "@remotion/cli": "^4.0.100"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
`,

  'remotion.config.ts': `import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
`,

  'tsconfig.json': `{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "lib": ["DOM", "ESNext"],
    "jsx": "react-jsx",
    "strict": true,
    "moduleResolution": "bundler",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*"]
}
`,
};

export default function EditorPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      sdk.embedProject(
        containerRef.current,
        {
          title: 'Remotion Video Project',
          description: 'Mission Control Video IDE',
          template: 'node',
          files: REMOTION_FILES,
        },
        {
          height: '100%',
          openFile: 'src/Composition.tsx',
          theme: 'dark',
          hideNavigation: false,
          hideDevTools: false,
        }
      );
    }
  }, []);

  return (
    <main className="h-screen w-screen bg-[#1e1e1e]">
      <div ref={containerRef} className="w-full h-full" />
    </main>
  );
}

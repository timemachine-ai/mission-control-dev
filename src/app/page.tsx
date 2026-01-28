'use client';

import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
} from '@codesandbox/sandpack-react';
import { Sidebar, ActivityBar, FileExplorer } from '@/components/ide';

// Remotion files - preserved from working engine
const SANDPACK_FILES = {
  "/App.tsx": `import { Player } from "@remotion/player";
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
}`,
  "/MyComp.tsx": `import { AbsoluteFill, useCurrentFrame } from "remotion";

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
};`,
  "/styles.css": `/* Global styles for Mission Control videos */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}`,
};

export default function Home() {
  return (
    <SandpackProvider
      template="react-ts"
      theme="dark"
      customSetup={{
        dependencies: {
          remotion: '4.0.100',
          '@remotion/player': '4.0.100',
          react: '18.2.0',
          'react-dom': '18.2.0',
        },
      }}
      files={SANDPACK_FILES}
      options={{
        activeFile: '/App.tsx',
      }}
    >
      <main className="h-screen w-screen bg-[#1e1e1e] flex flex-col overflow-hidden">
        {/* Main IDE Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Icons */}
          <Sidebar />

          {/* File Explorer Panel */}
          <FileExplorer />

          {/* Editor Panel */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <SandpackCodeEditor
              showTabs
              showLineNumbers
              closableTabs={false}
              style={{
                height: '100%',
                flex: 1,
              }}
            />
          </div>

          {/* Preview Panel */}
          <div className="w-[45%] border-l border-[#2d2d2d] flex flex-col overflow-hidden">
            <div className="h-[35px] flex items-center px-4 text-[11px] font-semibold text-[#bbbbbb] uppercase tracking-wider border-b border-[#2d2d2d]">
              Preview
            </div>
            <SandpackPreview
              showNavigator={false}
              showRefreshButton={false}
              style={{
                height: '100%',
                flex: 1,
              }}
            />
          </div>
        </div>

        {/* Bottom Status Bar */}
        <ActivityBar />
      </main>
    </SandpackProvider>
  );
}

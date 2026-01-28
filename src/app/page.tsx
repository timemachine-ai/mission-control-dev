'use client';
import { Sandpack } from '@codesandbox/sandpack-react';

export default function Home() {
  return (
    <main className="h-screen w-screen bg-[#1e1e1e] flex items-center justify-center">
      <Sandpack 
        template="react-ts" 
        theme="dark"
        options={{
          showNavigator: false,
          editorHeight: '80vh', 
        }}
        // We explicitly force the files to be React to override the Vanilla default
        files={{
          "/App.tsx": `import React from "react";
export default function App() {
  return (
    <div style={{ fontFamily: "sans-serif", padding: 20 }}>
      <h1>Mission Control Active</h1>
      <p>React Engine Loaded.</p>
    </div>
  );
}`,
        }}
      />
    </main>
  );
}

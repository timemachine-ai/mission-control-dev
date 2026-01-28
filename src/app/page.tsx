import Link from 'next/link';
import { Play, Code, Layers, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background gradient effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-50%] left-[-20%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-blue-600/20 to-transparent blur-3xl" />
        <div className="absolute bottom-[-30%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-tl from-purple-600/15 to-transparent blur-3xl" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <Play size={16} fill="white" className="ml-0.5" />
          </div>
          <span className="text-xl font-semibold tracking-tight">Mission Control</span>
        </div>
        <Link
          href="/editor"
          className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white transition-colors"
        >
          Open Editor
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center px-8 pt-32 pb-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium text-blue-400 bg-blue-500/10 rounded-full border border-blue-500/20">
          <Zap size={14} />
          Code-First Video Creation
        </div>

        <h1 className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight leading-tight">
          The IDE for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            Programmatic Video
          </span>
        </h1>

        <p className="max-w-2xl mt-8 text-lg md:text-xl text-white/50 leading-relaxed">
          Create stunning videos with React and Remotion. Write code, see instant previews,
          and render professional animations — all in your browser.
        </p>

        <div className="flex items-center gap-4 mt-12">
          <Link
            href="/editor"
            className="group inline-flex items-center gap-3 px-8 py-4 text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:opacity-90 transition-opacity"
          >
            Launch Editor
            <Play size={20} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

      {/* Features Grid */}
      <section className="relative z-10 px-8 py-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Code size={24} />}
            title="Code-First Workflow"
            description="Write React components that render as video frames. Full TypeScript support with instant feedback."
          />
          <FeatureCard
            icon={<Play size={24} />}
            title="Real-Time Preview"
            description="See your changes instantly with Remotion's player. Scrub through the timeline, adjust timing on the fly."
          />
          <FeatureCard
            icon={<Layers size={24} />}
            title="Component Library"
            description="Build reusable video components. Import Lottie animations, custom fonts, and external assets."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-8 py-8 border-t border-white/5 text-center text-white/30 text-sm">
        Mission Control — Video as Code
      </footer>
    </main>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-8 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors">
      <div className="w-12 h-12 mb-6 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center text-blue-400">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-white/50 leading-relaxed">{description}</p>
    </div>
  );
}

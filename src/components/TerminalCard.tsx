import { terminal } from '../data/content';

// Glassmorphism "terminal" summary card. Lines reveal via the parent's GSAP (.term-line).
export default function TerminalCard({ className = '' }: { className?: string }) {
  return (
    <div className={`terminal-card overflow-hidden rounded-2xl border border-white/15 bg-white/[0.04] shadow-[0_0_60px_-20px_rgba(103,232,249,.45)] backdrop-blur-xl ${className}`}>
      <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        <span className="ml-3 font-mono text-[11px] tracking-[0.2em] text-white/45">sumedh@portfolio: ~</span>
      </div>
      <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed">
        {terminal.map((l) => (
          <div key={l.cmd} className="term-line">
            <p><span className="text-neon-violet">❯</span> <span className="text-white">{l.cmd}</span></p>
            <p className="text-neon-cyan/85">{l.out}</p>
          </div>
        ))}
        <p className="term-line"><span className="text-neon-violet">❯</span> <span className="type-caret inline-block h-[1em] w-[0.55ch] translate-y-[0.15em] bg-white/80" /></p>
      </div>
    </div>
  );
}

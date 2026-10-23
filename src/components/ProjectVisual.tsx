import { useState } from 'react';
import type { Project } from '../data/content';
import BackgroundVideo from './BackgroundVideo';

// Cinematic loop if configured, else a still image, else an original generated composition.
// None of these show client data or proprietary screens.
export default function ProjectVisual({ project, priority = false }: { project: Project; priority?: boolean }) {
  const [failed, setFailed] = useState(false);
  if (project.video) {
    return <BackgroundVideo source={project.video} label={project.title} overlay={false} priority={priority} />;
  }
  if (project.image && !failed) {
    return <img src={project.image} alt="" loading="lazy" onError={() => setFailed(true)} className="h-full w-full object-cover" />;
  }
  const h = project.hue;
  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: `radial-gradient(circle at 30% 30%, hsl(${h} 90% 55% / .55), transparent 55%),
                     radial-gradient(circle at 75% 70%, hsl(${h + 40} 90% 50% / .45), transparent 50%), #07070f`,
      }}
    >
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 animate-[spin_40s_linear_infinite] rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[45vmin] w-[45vmin] -translate-x-1/2 -translate-y-1/2 animate-[spin_25s_linear_infinite_reverse] rounded-full border border-dashed border-white/15" />
      <span className="text-outline absolute -right-[2vw] top-1/2 -translate-y-1/2 select-none font-display text-[38vmin] font-extrabold leading-none opacity-60">
        {project.index}
      </span>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { prefersReducedMotion } from '../lib/gsap';

// Types each role, pauses, deletes it, moves to the next. Static first role for reduced motion.
export default function TypingRoles({ roles, start = true, className = '' }: { roles: string[]; start?: boolean; className?: string }) {
  const [text, setText] = useState('');
  const [i, setI] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced || !start) return;
    const word = roles[i % roles.length];
    let delay = deleting ? 35 : 70;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === '') delay = 300;

    const t = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true);
      else if (deleting && text === '') { setDeleting(false); setI((n) => n + 1); }
      else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1));
    }, delay);
    return () => clearTimeout(t);
  }, [text, deleting, i, roles, reduced, start]);

  return (
    <p className={className}>
      <span className="sr-only">{roles.join(', ')}</span>
      <span aria-hidden="true">
        <span className="text-neon-cyan">&gt; </span>
        {reduced ? roles[0] : text}
        <span className="type-caret ml-0.5 inline-block h-[1em] w-[0.55ch] translate-y-[0.15em] bg-neon-cyan" />
      </span>
    </p>
  );
}

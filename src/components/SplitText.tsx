import { Fragment, type ElementType } from 'react';

type Props = { text: string; as?: ElementType; className?: string; split?: 'chars' | 'words' };

// Splits text into masked words/chars for GSAP. Screen readers get the full text once via sr-only.
export default function SplitText({ text, as: Tag = 'span', className = '', split = 'chars' }: Props) {
  const words = text.split(' ');
  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Fragment key={i}>
          <span className="mask-line" aria-hidden="true">
            {split === 'chars' ? (
              <span className="word inline-block whitespace-nowrap">
                {[...word].map((ch, j) => (
                  <span key={j} className="char inline-block will-change-transform">{ch}</span>
                ))}
              </span>
            ) : (
              <span className="word inline-block will-change-transform">{word}</span>
            )}
          </span>
          {i < words.length - 1 && ' '}
        </Fragment>
      ))}
    </Tag>
  );
}

'use client';

import { useEffect, useRef } from 'react';

export default function ScrollProgress() {
  const progressRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const targetProgress = useRef(0);
  const currentProgress = useRef(0);

  useEffect(() => {
    const updateTarget = () => {
      const scrollTop = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      targetProgress.current =
        scrollHeight > 0 ? scrollTop / scrollHeight : 0;

      if (rafRef.current === null) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    const animate = () => {
      const difference =
        targetProgress.current - currentProgress.current;

      currentProgress.current += difference * 0.15;

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${currentProgress.current})`;
      }

      if (Math.abs(difference) > 0.0005) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        currentProgress.current = targetProgress.current;
        rafRef.current = null;

        if (progressRef.current) {
          progressRef.current.style.transform =
            `scaleX(${currentProgress.current})`;
        }
      }
    };

    window.addEventListener('scroll', updateTarget, { passive: true });
    window.addEventListener('resize', updateTarget, { passive: true });

    updateTarget();

    return () => {
      window.removeEventListener('scroll', updateTarget);
      window.removeEventListener('resize', updateTarget);

      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[100] pointer-events-none">
      <div
        ref={progressRef}
        className="h-full origin-left bg-gradient-to-r from-accent to-accent-secondary shadow-[0_0_10px_rgba(14,165,233,0.5)]"
        style={{
          transform: 'scaleX(0)',
          willChange: 'transform',
        }}
      />
    </div>
  );
}
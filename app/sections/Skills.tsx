'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { useInView } from '../hooks/useInView';

const SkillsCanvas = dynamic(() => import('./SkillsCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function Skills() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 640px)');

    const update = () => {
      setIsMobile(mediaQuery.matches);
    };

    update();
    mediaQuery.addEventListener('change', update);

    return () => {
      mediaQuery.removeEventListener('change', update);
    };
  }, []);

  const { ref: headerRef, isInView: headerInView } = useInView(0.2);
  const [visible, setVisible] = useState(false);
  const [hasLoadedCanvas, setHasLoadedCanvas] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    // Load the 3D code shortly before the Skills stage enters the viewport.
    const loadObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasLoadedCanvas(true);
          loadObserver.disconnect();
        }
      },
      {
        rootMargin: '300px 0px',
        threshold: 0,
      }
    );

    // Keep the existing pause/resume behavior for the animation loop.
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    loadObserver.observe(stage);
    visibilityObserver.observe(stage);

    return () => {
      loadObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <section
      id="skills"
      className="relative py-24 lg:py-32 section-padding"
    >
      <div className="max-w-7xl mx-auto">
        <div
          ref={headerRef}
          className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${headerInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
            }`}
        >
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">
            What I Do
          </p>

          <h2 className="text-ink font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
            Skills
          </h2>

          <p className="text-ink-muted text-lg max-w-2xl mx-auto leading-relaxed">
            A visual representation of my
            technical skills, experience, and
            continuous learning.
          </p>
        </div>

        <div
          ref={stageRef}
          className="relative z-0 w-full h-[620px] sm:h-[680px] lg:h-[720px] overflow-hidden rounded-[2rem]"
        >
          {hasLoadedCanvas && (
            <SkillsCanvas
              isMobile={isMobile}
              visible={visible}
            />
          )}
        </div>
      </div>
    </section>
  );
}
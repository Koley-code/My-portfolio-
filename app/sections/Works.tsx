'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig } from '../lib/siteConfig';
import { useInView } from '../hooks/useInView';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, ArrowUpRight, X } from 'lucide-react';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export default function Works() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const { ref: headerRef, isInView: headerInView } = useInView(0.2);

  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] =
    useState<typeof siteConfig.projects[0] | null>(null);

  const touchStartRef = useRef({
    x: 0,
    y: 0,
  });

  const touchTrackingRef = useRef(false);

  const handleTouchStart = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    const target = event.target as HTMLElement;

    // Don't treat taps/swipes on buttons or links
    // as project swipes.
    if (
      target.closest(
        'button, a, input, textarea, select'
      )
    ) {
      touchTrackingRef.current = false;
      return;
    }

    const touch = event.changedTouches[0];

    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
    };

    touchTrackingRef.current = true;
  };

  const handleTouchEnd = (
    event: React.TouchEvent<HTMLDivElement>
  ) => {
    if (!touchTrackingRef.current) {
      return;
    }

    const touch = event.changedTouches[0];

    const deltaX =
      touch.clientX - touchStartRef.current.x;

    const deltaY =
      touch.clientY - touchStartRef.current.y;

    touchTrackingRef.current = false;

    const horizontalDistance =
      Math.abs(deltaX);

    const verticalDistance =
      Math.abs(deltaY);

    // Ignore normal vertical page scrolling.
    if (
      horizontalDistance < 50 ||
      horizontalDistance < verticalDistance * 1.2
    ) {
      return;
    }

    if (deltaX < 0) {
      goNext();
    } else {
      goPrevious();
    }
  };

  const projects = useMemo(
    () => siteConfig.projects,
    []
  );

  const totalProjects = projects.length;

  const getStackOffset = (index: number) => {
    for (let offset = 1; offset <= 3; offset++) {
      const nextIndex =
        (activeIndex + offset) % totalProjects;

      if (index === nextIndex) {
        return offset;
      }
    }

    return 0;
  };

  const goNext = () => {
    setActiveIndex((current) =>
      current === totalProjects - 1
        ? 0
        : current + 1
    );
  };

  const goPrevious = () => {
    setActiveIndex((current) =>
      current === 0
        ? totalProjects - 1
        : current - 1
    );
  };

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.works-deck-card').forEach((card, i) => {
        gsap.fromTo(
          card,
          { top: '40px', opacity: 0 },
          {
            top: '0px',
            opacity: 1,
            duration: 0.3,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 90%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        goNext();
      }

      if (event.key === 'ArrowLeft') {
        goPrevious();
      }

      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener(
      'keydown',
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  }, [totalProjects]);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 section-padding"
    >
      <div className="max-w-7xl mx-auto">

        {/* =========================================
            HEADER
           ========================================= */}

        <div
          ref={headerRef}
          className={`text-center mb-12 lg:mb-16 transition-all duration-700 ${headerInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">
            Selected Work
          </p>

          <h2 className="text-ink font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
            Works
          </h2>

          <p className="text-ink-muted text-lg max-w-2xl mx-auto leading-relaxed">
            A collection of projects that represent my
            best work in design, development, and
            creative problem-solving.
          </p>
        </div>

        {/* =========================================
            STACKING CARD DECK
           ========================================= */}

        <div
          className="works-deck"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchTrackingRef.current = false;
          }}
        >

          {projects.map((project, index) => {
            const stackOffset =
              getStackOffset(index);

            const isActive =
              index === activeIndex;

            const isStacked =
              stackOffset > 0;

            if (!isActive && !isStacked) {
              return null;
            }

            let translateX = 0;
            let translateY = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 50;

            if (isStacked) {
              translateX = 0;
              translateY = 0;

              scale = 1;

              opacity = 1;

              zIndex = 40 - stackOffset;
            }

            const transform =
              `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;

            return (
              <article
                key={project.title}
                className={[
                  'works-deck-card',
                  isActive
                    ? 'glow-image-card active'
                    : 'stacked-project-card',
                ].join(' ')}
                style={{
                  transform,
                  opacity,
                  zIndex,
                  ['--stack-index' as string]:
                    stackOffset,
                }}
              >

                {!isActive && (
                  <button
                    type="button"
                    className="works-project-tab"
                    onClick={() =>
                      setActiveIndex(index)
                    }
                    style={{
                      ['--tab-color' as string]:
                        [
                          '#4f46e5',
                          '#06b6d4',
                          '#8b5cf6',
                          '#10b981',
                          '#f59e0b',
                          '#ec4899',
                          '#ef4444',
                          '#14b8a6',
                        ][index % 8],
                    }}
                    aria-label={`Open ${project.title}`}
                  >
                    <span className="works-project-tab-number">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="works-project-tab-name">
                      {project.title}
                    </span>
                  </button>
                )}

                {/* IMAGE */}

                <div className="works-card-image">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    priority={isActive}
                    loading={isActive ? "eager" : "lazy"}
                    className="object-cover object-center"
                  />

                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-accent-secondary/5" />

                  {/* TECHNOLOGY TAGS */}

                  <div className="absolute top-5 left-5 right-5 flex flex-wrap gap-2 z-30">
                    {project.technologies
                      .slice(0, 3)
                      .map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 bg-white/80 backdrop-blur-sm rounded-full text-xs font-medium text-ink-muted border border-white/60"
                        >
                          {tech}
                        </span>
                      ))}
                  </div>

                  {/* PROJECT NUMBER */}

                  <div className="absolute bottom-5 left-5 z-30">
                    <span className="inline-flex items-center justify-center px-3 py-1.5 rounded-full bg-black/55 backdrop-blur-md text-white text-xs font-mono">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="works-card-content">

                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                      {project.year}
                    </span>

                    <span className="px-3 py-1 bg-slate-100 text-ink-muted text-xs font-medium rounded-full">
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-ink font-bold text-2xl lg:text-3xl mb-4">
                    {project.title}
                  </h3>

                  <p className="text-ink-muted leading-relaxed mb-6">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map(
                      (tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 bg-slate-100 text-ink-muted text-xs rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      )
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">

                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-ink text-white rounded-full text-sm font-medium hover:bg-ink/90 transition-all hover:scale-105"
                    >
                      Live Demo
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 glass text-ink rounded-full text-sm font-medium hover:bg-white/80 transition-all hover:scale-105"
                    >
                      <Github className="w-4 h-4" />
                      Code
                    </a>

                    <button
                      onClick={() =>
                        setSelectedProject(
                          project
                        )
                      }
                      className="inline-flex items-center gap-2 px-5 py-2.5 border border-slate-200 text-ink rounded-full text-sm font-medium hover:border-accent/30 hover:bg-accent/5 transition-all hover:scale-105"
                    >
                      Details
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                  </div>
                </div>
                {/* MOBILE PROJECT LABEL */}

                <div
                  className="works-mobile-project-label"
                  style={{
                    backgroundColor:
                      [
                        '#4f46e5',
                        '#06b6d4',
                        '#8b5cf6',
                        '#10b981',
                        '#f59e0b',
                        '#ec4899',
                        '#ef4444',
                        '#14b8a6',
                      ][index % 8],
                  }}
                >
                  <span className="works-mobile-project-number">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="works-mobile-project-name">
                    {project.title}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* =========================================
            PAGINATION
           ========================================= */}

        <div className="works-pagination">

          <button
            type="button"
            onClick={goPrevious}
            className="works-pagination-arrow"
            aria-label="Previous project"
          >
            &lt;&lt; Previous
          </button>

          {projects.map((project, index) => (
            <button
              key={project.title}
              type="button"
              onClick={() =>
                setActiveIndex(index)
              }
              className={`works-pagination-number ${activeIndex === index
                ? 'is-active'
                : ''
                }`}
              aria-label={`Go to ${project.title}`}
              aria-current={
                activeIndex === index
                  ? 'page'
                  : undefined
              }
            >
              {index + 1}
            </button>
          ))}

          <button
            type="button"
            onClick={goNext}
            className="works-pagination-arrow"
            aria-label="Next project"
          >
            Next &gt;&gt;
          </button>

        </div>
      </div>

      {/* =========================================
          PROJECT DETAILS MODAL
         ========================================= */}

      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() =>
            setSelectedProject(null)
          }
        >
          <div className="absolute inset-0 bg-ink/30 backdrop-blur-sm" />

          <div
            className="relative w-full max-w-2xl glass-strong rounded-3xl p-8 shadow-2xl max-h-[85vh] overflow-y-auto"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              onClick={() =>
                setSelectedProject(null)
              }
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
              aria-label="Close project details"
            >
              <X className="w-5 h-5 text-ink" />
            </button>

            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className="px-3 py-1 bg-accent/10 text-accent text-xs font-semibold rounded-full">
                  {selectedProject.year}
                </span>

                <span className="px-3 py-1 bg-slate-100 text-ink-muted text-xs font-medium rounded-full">
                  {selectedProject.status}
                </span>
              </div>

              <h3 className="text-ink font-bold text-2xl mb-3">
                {selectedProject.title}
              </h3>

              <p className="text-ink-muted leading-relaxed">
                {selectedProject.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {selectedProject.technologies.map(
                (tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 bg-slate-100 text-ink-muted text-sm rounded-lg font-medium"
                  >
                    {tech}
                  </span>
                )
              )}
            </div>

            <div className="flex gap-3">
              <a
                href={selectedProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-full text-sm font-medium hover:bg-ink/90 transition-all"
              >
                Live Demo
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 glass text-ink rounded-full text-sm font-medium hover:bg-white/80 transition-all"
              >
                <Github className="w-4 h-4" />
                View Code
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
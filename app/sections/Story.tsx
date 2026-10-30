'use client';

import { useEffect, useRef, type CSSProperties, } from 'react';
import { siteConfig } from '../lib/siteConfig';
import { useInView } from '../hooks/useInView';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Briefcase, Rocket, Sparkles } from 'lucide-react';
import JourneyRoad from '../components/JourneyRoad';
import JourneyTunnel from '../components/JourneyTunnel';

gsap.registerPlugin(ScrollTrigger);

const milestoneIcons: Record<
  string,
  React.ReactNode
> = {
  'Started Journey': (
    <Sparkles className="w-5 h-5" />
  ),
  'UI/UX Designer': (
    <GraduationCap className="w-5 h-5" />
  ),
  'Frontend Engineer': (
    <Briefcase className="w-5 h-5" />
  ),
  'Creative Developer': (
    <Rocket className="w-5 h-5" />
  ),
  'Senior Creative Developer': (
    <Sparkles className="w-5 h-5" />
  ),
};

const cardColors = [
  '#173f52',
  '#3d9bb0',
  '#ef7657',
  '#173f52',
  '#3d9bb0',
];

const journeyTimeline = [...siteConfig.timeline].sort(
  (a, b) => Number(a.year) - Number(b.year)
);

export default function Story() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const {
    ref: headerRef,
    isInView: headerInView,
  } = useInView(0.2);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      /*
       * Keep the existing Journey entrance
       * animation behavior.
       */
      gsap.utils
        .toArray<HTMLElement>('.timeline-item')
        .forEach((item, i) => {
          gsap.fromTo(
            item,
            {
              x:
                i % 2 === 0
                  ? -50
                  : 50,
              opacity: 0,
            },
            {
              x: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions:
                  'play none none reverse',
              },
            }
          );
        });

      /*
       * Keep the existing line animation.
       */
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger:
              sectionRef.current,
            start: 'top 60%',
            toggleActions:
              'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative py-24 lg:py-32 section-padding"
    >
      <div className="max-w-7xl mx-auto">

        {/* =========================================
            HEADER
           ========================================= */}

        <div
          ref={headerRef}
          className={`text-center mb-14 lg:mb-20 transition-all duration-700 ${headerInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">
            My Journey
          </p>

          <h2 className="text-ink font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
            Story
          </h2>

          <p className="text-ink-muted text-lg max-w-2xl mx-auto leading-relaxed">
            From curiosity to craft — a path defined by continuous learning,
            creative exploration, and a relentless pursuit of excellence.
          </p>
        </div>

        {/* =========================================
            ROAD + CARDS
           ========================================= */}

        <div className="journey-map">

          {/* Existing road */}

          <div className="journey-map-road">
            <JourneyRoad />
          </div>

          <div className="journey-map-tunnel">
            <JourneyTunnel />
          </div>

          {/* =======================================
              JOURNEY CARDS
             ======================================= */}

          <div className="journey-cards">
            {journeyTimeline.map(
              (event, index) => {
                const color =
                  cardColors[
                  index %
                  cardColors.length
                  ];

                const icon =
                  milestoneIcons[
                  event.title
                  ] || (
                    <Sparkles className="w-5 h-5" />
                  );

                return (
                  <div
                    key={event.year}
                    className={`timeline-item journey-info-card journey-card-${index + 1} ${index % 2 === 0
                      ? 'journey-card-left'
                      : 'journey-card-right'
                      }`}
                    style={
                      {
                        '--journey-tab-color':
                          color,
                      } as React.CSSProperties
                    }
                  >
                    {/* Colored title tab */}

                    <div className="journey-card-tab">
                      {event.title}
                    </div>

                    {/* Card body */}

                    <div className="journey-card-body">

                      <div className="journey-card-meta">
                        <span className="journey-card-year">
                          {event.year}
                        </span>

                        <span className="journey-card-icon">
                          {icon}
                        </span>
                      </div>

                      <p>
                        {event.description}
                      </p>
                    </div>
                  </div>
                );
              }
            )}
          </div>

          {/* =======================================
              ROAD MILESTONE POINTS
          ======================================= */}

          <div className="journey-road-points">
            {journeyTimeline.map((event, index) => {
              const pinColor =
                cardColors[
                index % cardColors.length
                ];

              const icon =
                milestoneIcons[event.title] || (
                  <Sparkles className="w-5 h-5" />
                );

              return (
                <div
                  key={`pin-${event.year}`}
                  className={`journey-road-point journey-point-${index + 1}`}
                  style={
                    {
                      '--pin-color': pinColor,
                    } as CSSProperties
                  }
                >
                  <div className="journey-location-pin">

                    {/* Main location pin */}
                    <svg
                      viewBox="0 0 100 125"
                      className="journey-pin-svg"
                      aria-hidden="true"
                    >
                      <defs>
                        <linearGradient
                          id={`journeyPinGradient-${index}`}
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            stopColor="white"
                            stopOpacity="0.18"
                          />

                          <stop
                            offset="18%"
                            stopColor="var(--pin-color)"
                          />

                          <stop
                            offset="100%"
                            stopColor="var(--pin-color)"
                            stopOpacity="0.72"
                          />
                        </linearGradient>
                      </defs>

                      <path
                        d="
                         M50 4
                         C24 4 7 22 7 47
                         C7 72 27 91 50 119
                         C73 91 93 72 93 47
                         C93 22 76 4 50 4
                         Z
                        "
                        fill={`url(#journeyPinGradient-${index})`}
                      />

                      {/* Soft inner edge */}
                      <path
                        d="
                          M50 7
                          C27 7 11 24 11 47
                          C11 69 29 87 50 113
                          C71 87 89 69 89 47
                          C89 24 73 7 50 7
                          Z
                        "
                        fill="none"
                        stroke="rgba(255,255,255,0.22)"
                        strokeWidth="2"
                      />
                    </svg>

                    {/* Logo inside the pin */}
                    <div className="journey-pin-logo">
                      {icon}
                    </div>

                    {/* Ground shadow */}
                    <div className="journey-pin-ground-shadow" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
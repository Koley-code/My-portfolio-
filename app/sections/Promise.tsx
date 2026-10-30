'use client';

import { useEffect, useRef, useState, type CSSProperties, } from 'react';
import { siteConfig } from '../lib/siteConfig';
import { useInView } from '../hooks/useInView';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Lightbulb,
  Code2,
  Monitor,
  Zap,
  Box,
  Brain,
  Eye,
  Heart,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const specialtyIcons = [
  <Lightbulb key="1" className="w-6 h-6" />,
  <Code2 key="2" className="w-6 h-6" />,
  <Monitor key="3" className="w-6 h-6" />,
  <Zap key="4" className="w-6 h-6" />,
  <Box key="5" className="w-6 h-6" />,
  <Brain key="6" className="w-6 h-6" />,
  <Eye key="7" className="w-6 h-6" />,
  <Heart key="8" className="w-6 h-6" />,
];

const TOTAL = siteConfig.specialties.length;

export default function Promise() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      '(max-width: 640px)'
    );

    const update = () => {
      setIsMobile(mediaQuery.matches);
    };

    update();

    mediaQuery.addEventListener(
      'change',
      update
    );

    return () => {
      mediaQuery.removeEventListener(
        'change',
        update
      );
    };
  }, []);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const rotationRef = useRef(0);
  const lastTimeRef = useRef(0);
  const frameRef = useRef<number | null>(null);

  const { ref: headerRef, isInView: headerInView } =
    useInView(0.2);

  const [isPaused, setIsPaused] = useState(false);
  const [selectedIndex, setSelectedIndex] =
    useState<number | null>(null);

  const getFrontCardIndex = () => {
    let frontIndex = 0;
    let bestFrontness = -Infinity;

    for (let index = 0; index < TOTAL; index++) {
      const baseAngle = (360 / TOTAL) * index;

      const angle =
        (baseAngle * Math.PI) / 180 +
        rotationRef.current;

      /*
       * cos(angle) is highest when the card is
       * at the front-center of the 3D ring.
       */
      const frontness = Math.cos(angle);

      if (frontness > bestFrontness) {
        bestFrontness = frontness;
        frontIndex = index;
      }
    }

    return frontIndex;
  };
  /* =========================================
   RING + CARD ANIMATION
   ========================================= */

  useEffect(() => {
    const animate = (time: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = time;
      }

      const delta =
        (time - lastTimeRef.current) / 1000;

      lastTimeRef.current = time;

      if (!isPaused && selectedIndex === null) {
        rotationRef.current += delta * 0.32;
      }

      const isMobile =
        window.matchMedia('(max-width: 640px)').matches;

      const radiusX = isMobile ? 250 : 330;
      const radiusY = isMobile ? 55 : 115;
      const depth = isMobile ? 65 : 220;

      const frontIndex = getFrontCardIndex();

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const baseAngle =
          (360 / TOTAL) * index;

        const angle =
          (baseAngle * Math.PI) / 180 +
          rotationRef.current;

        const x =
          Math.sin(angle) * radiusX;

        const y =
          Math.cos(angle) * radiusY;

        const z =
          Math.cos(angle) * depth;

        const normalizedDepth =
          (z + depth) /
          (depth * 2);

        const isSelected =
          selectedIndex === index;

        const scale = isSelected
          ? 1
          : 0.88 +
          normalizedDepth * 0.12;

        /*
         * IMPORTANT:
         * The card itself NEVER rotates.
         * Only its position around the ring changes.
         */

        const transform = isSelected
          ? `
          translate3d(
            ${x}px,
            ${y - 15}px,
            ${z + 110}px
          )
          scale(1.17)
            `
          : `
          translate3d(
            ${x}px,
            ${y}px,
            ${z}px
          )
          scale(${scale})
          `;
        card.style.transform = transform;

        card.style.zIndex = isSelected
          ? '100'
          : String(
            20 +
            Math.round(
              normalizedDepth * 30
            )
          );
        card.style.pointerEvents =
          index === frontIndex
            ? 'auto'
            : 'none';
        card.style.opacity = isSelected
          ? '1'
          : String(
            0.62 +
            normalizedDepth * 0.38
          );
      });

      frameRef.current =
        requestAnimationFrame(animate);
    };

    frameRef.current =
      requestAnimationFrame(animate);

    return () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(
          frameRef.current
        );
      }

      lastTimeRef.current = 0;
    };
  }, [isPaused, selectedIndex]);

  /* =========================================
     CARD CLICK
     ========================================= */

  const handleCardClick = (index: number) => {
    const frontIndex = getFrontCardIndex();

    /*
     * Only the front-center card can be selected.
     */
    if (index !== frontIndex) {
      return;
    }

    setSelectedIndex((current) => {
      if (current === index) {
        setIsPaused(false);
        return null;
      }

      setIsPaused(true);
      return index;
    });
  };

  return (
    <section
      id="promise"
      ref={sectionRef}
      className="relative py-24 lg:py-32 section-padding"
    >
      <div className="max-w-7xl mx-auto">

        {/* =========================================
            SECTION HEADER
           ========================================= */}

        <div
          ref={headerRef}
          className={`text-center mb-10 lg:mb-14 transition-all duration-700 ${headerInView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
            }`}
        >
          <p className="text-accent font-medium text-sm tracking-widest uppercase mb-4">
            My Value
          </p>

          <h2 className="text-ink font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
            Why Choose Me
          </h2>

          <p className="text-ink-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Beyond technical skills, I bring a mindset and approach that consistently
            delivers exceptional results.
          </p>
        </div>

        {/* =========================================
            3D RING AREA
           ========================================= */}

        <div className="why-ring-stage">

          <div className="why-ring-scene">

            {/* Visual ring */}

            <div className="why-ring-visual" />

            {/* Rotating ring */}

            <div className="why-ring">
              {siteConfig.specialties.map(
                (specialty, index) => {
                  const angle =
                    (360 / TOTAL) * index;

                  const isSelected =
                    selectedIndex === index;

                  return (
                    <button
                      key={specialty.title}
                      ref={(element) => {
                        cardRefs.current[index] = element;
                      }}
                      type="button"
                      className={`specialty-ring-card dual-glow-card ${isSelected
                        ? 'is-selected'
                        : ''
                        }`}
                      style={
                        {
                          '--card-angle': `${angle}deg`,
                          '--card-delay':
                            `${index * 0.04}s`,
                        } as CSSProperties
                      }
                      onClick={() =>
                        handleCardClick(index)
                      }
                      aria-pressed={isSelected}
                    >
                      {/* =================================
                          EXISTING ICON
                         ================================= */}

                      <div
                        className={`why-card-icon ${isSelected
                          ? 'is-selected'
                          : ''
                          }`}
                      >
                        {specialtyIcons[index]}
                      </div>

                      {/* =================================
                          EXISTING TITLE
                         ================================= */}

                      <h3>
                        {specialty.title}
                      </h3>

                      {/* =================================
                          EXISTING DESCRIPTION
                         ================================= */}

                      <div
                        className={`why-card-description ${isSelected
                          ? 'is-visible'
                          : ''
                          }`}
                      >
                        <p>
                          {specialty.description}
                        </p>
                      </div>

                      <div className="why-click-hint">
                        {isSelected ? 'CLICK TO CLOSE' : 'CLICK TO SEE'}
                        <span>{isSelected ? '×' : '→'}</span>
                      </div>

                      {/* Existing ambient accent */}

                      <div className="why-card-orb" />
                    </button>
                  );
                }
              )}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
'use client';

import { useEffect, useRef } from 'react';
import { useInView } from '../hooks/useInView';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import CertificateAlbum from '../components/CertificateAlbum';

gsap.registerPlugin(ScrollTrigger);

export default function Certificates() {
  const sectionRef =
    useRef<HTMLDivElement>(null);

  const {
    ref: headerRef,
    isInView: headerInView,
  } = useInView(0.2);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.certificate-album-shell',
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          ease: 'power3.out',
          scrollTrigger: {
            trigger:
              '.certificate-album-shell',
            start: 'top 86%',
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
      id="certificates"
      className="relative pt-24 pb-0 lg:pt-32 lg:pb-16 section-padding"
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
            Credentials
          </p>

          <h2 className="text-ink font-bold text-3xl sm:text-4xl lg:text-5xl tracking-tight mb-6">
            My Certificates
          </h2>

          <p className="text-ink-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Continuous learning is core to my practice.
            Browse my certificates as pages of a
            physical portfolio album.
          </p>
        </div>

        <CertificateAlbum />
      </div>
    </section>
  );
}
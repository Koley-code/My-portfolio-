'use client';

import { useEffect, useRef } from 'react';
import { siteConfig } from '../lib/siteConfig';
import { ArrowRight, Download, Mail, Github, Linkedin, MessageCircle, Instagram, Facebook, Twitter } from 'lucide-react';
import gsap from 'gsap';
import Image from 'next/image';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const bioRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        nameRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      )
        .fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.6'
        )
        .fromTo(
          taglineRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          bioRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          ctaRef.current,
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          '-=0.5'
        )
        .fromTo(
          profileRef.current,
          { rotateY: -5 },
          { rotateY: 0, duration: 0.8, ease: 'power2.out' },
          0
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const scrollToWorks = () => {
    const el = document.querySelector('#works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToConnect = () => {
    const el = document.querySelector('#connect');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center section-padding pt-32 pb-20 lg:pt-0 lg:pb-0"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div className="order-2 lg:order-1">
            <p
              ref={titleRef}
              className="text-accent font-medium text-sm tracking-widest uppercase mb-4 opacity-0"
            >
              {siteConfig.personal.title}
            </p>
            <h1
              ref={nameRef}
              className="text-ink font-bold leading-[0.95] tracking-tight mb-6 opacity-0"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
            >
              {siteConfig.personal.name}
            </h1>
            <p
              ref={taglineRef}
              className="text-ink-muted text-lg sm:text-xl leading-relaxed max-w-xl mb-6 opacity-0"
            >
              {siteConfig.personal.tagline}
            </p>
            <p
              ref={bioRef}
              className="text-ink-muted text-base leading-relaxed max-w-lg mb-7 opacity-0"
            >
              {siteConfig.personal.bio}
            </p>

            <div ref={ctaRef} className="opacity-0">
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={scrollToWorks}
                  className="group inline-flex items-center gap-2 px-6 py-3 bg-ink text-white rounded-full text-sm font-medium hover:bg-ink/90 transition-all hover:scale-105 active:scale-95"
                >
                  Explore My Work
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={scrollToConnect}
                  className="group inline-flex items-center gap-2 px-6 py-3 glass text-ink rounded-full text-sm font-medium hover:bg-white/80 transition-all hover:scale-105 active:scale-95"
                >
                  Let's Connect
                  <Mail className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
                <a
                  href={siteConfig.resume.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 border border-slate-200 text-ink rounded-full text-sm font-medium hover:border-accent/30 hover:bg-accent/5 transition-all hover:scale-105 active:scale-95"
                >
                  View Resume
                  <Download className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
                </a>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <div
              ref={profileRef}
              className="relative group"
              style={{ perspective: '1000px' }}
            >
              <div className="profile-crystal-frame relative w-[250px] h-[325px] sm:w-[320px] sm:h-[420px] lg:w-[380px] lg:h-[480px] rounded-[2rem] overflow-hidden shadow-2xl shadow-slate-300/50 transition-transform duration-500 group-hover:scale-[1.02] group-hover:rotate-y-2">
                <div className="absolute inset-0">
                  <Image
                    src={siteConfig.personal.profileImage}
                    alt={siteConfig.personal.name}
                    fill
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="object-cover"
                    priority
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
              </div>

              <div className="absolute -inset-4 rounded-[2.5rem] border-2 border-accent/15 pointer-events-none" />
              <div className="absolute -inset-8 rounded-[3rem] border-2 border-accent/15 pointer-events-none" />

              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/65 to-accent-secondary/65 backdrop-blur-sm border border-white/60 shadow-[0_8px_30px_rgba(14,165,233,0.28)] animate-float" />
              <div className="absolute -bottom-6 -left-6 w-16 h-16 rounded-xl bg-gradient-to-br from-accent-secondary/55 to-accent/55 backdrop-blur-sm border border-white/60 shadow-[0_8px_28px_rgba(99,102,241,0.25)] animate-float" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 -right-8 w-3 h-3 rounded-full bg-accent shadow-[0_0_12px_rgba(14,165,233,0.6)] animate-pulse" />
              <div className="absolute bottom-1/4 -left-8 w-2 h-2 rounded-full bg-accent-secondary shadow-[0_0_10px_rgba(99,102,241,0.6)] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

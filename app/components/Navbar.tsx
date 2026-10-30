'use client';

import { useEffect, useState, useRef } from 'react';
import { navItems, siteConfig } from '../lib/siteConfig';
import { cn } from '../lib/utils';

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 100);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0 }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observerRef.current?.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToSection = (href: string, id: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <header
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500',
        isVisible ? 'translate-y-0 opacity-100' : '-translate-y-24 opacity-0',
        isScrolled ? 'top-3' : 'top-6'
      )}
    >
      <nav
        className={cn(
          'flex items-center gap-1 px-2 py-2 rounded-full transition-all duration-500 max-w-[calc(100vw-24px)]', isScrolled
          ? 'glass-strong shadow-xl'
          : 'bg-white/40 backdrop-blur-md border border-white/30'
        )}
      >
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('#home', 'home');
          }}
          className="flex items-center gap-2 px-4 py-2 mr-2"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-md shadow-accent/20">
            <span className="text-white text-sm font-bold">
              {siteConfig.personal.name.charAt(0)}
            </span>
          </div>
          <span className="hidden md:block text-sm font-semibold text-ink tracking-tight">
            {siteConfig.personal.name.split(' ')[0]}
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-0.5">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.href, item.id)}
              className={cn(
                'relative px-4 py-2 text-xs font-medium tracking-wider uppercase transition-all duration-300 rounded-full',
                activeSection === item.id
                  ? 'text-accent bg-accent/10'
                  : 'text-ink-muted hover:text-ink hover:bg-white/50'
              )}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute inset-0 rounded-full border border-accent/30 animate-pulse-slow" />
              )}
            </button>
          ))}
        </div>
        {/* Blog button */}
        <a
          href="/blog"
          className="flex shrink-0 items-center gap-2 ml-1 px-4 py-2 text-xs font-medium tracking-wider uppercase bg-ink text-white rounded-full hover:bg-ink/90 transition-colors"
        >
          BLOG
        </a>


        {/* Resume button */}
        <a
          href={siteConfig.resume.path}
          target="_blank"
          rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-2 ml-1 px-4 py-2 text-xs font-medium tracking-wider uppercase bg-ink text-white rounded-full hover:bg-ink/90 transition-colors"
        >
          RESUME
        </a>


      </nav>
    </header>
  );
}

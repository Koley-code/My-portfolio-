'use client';

import { useState, useEffect } from 'react';
import { navItems, siteConfig } from '../lib/siteConfig';
import { cn } from '../lib/utils';
import { Menu, X } from 'lucide-react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );

    navItems.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string, id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }, 500);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed top-4 right-4 z-[60] lg:hidden w-12 h-12 rounded-2xl flex items-center justify-center bg-white/45 backdrop-blur-xl backdrop-saturate-150 border border-white/70 shadow-[0_8px_30px_rgba(15,23,42,0.12)] transition-all duration-300',
          isOpen
            ? 'bg-white/65 shadow-[0_10px_35px_rgba(15,23,42,0.16)] scale-105'
            : 'hover:bg-white/60 hover:scale-105'
        )}
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-5 h-5 text-ink" /> : <Menu className="w-5 h-5 text-ink" />}
      </button>

      <div
        className={cn(
          'fixed inset-0 z-[55] lg:hidden transition-all duration-500',
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
      >
        <div className="absolute inset-0 bg-white/35 backdrop-blur-2xl backdrop-saturate-150" />
        <div
          className={cn(
            'relative h-full flex flex-col items-center justify-center px-8 transition-all duration-500 ease-out',
            isOpen
              ? 'opacity-100 scale-100 translate-y-0'
              : 'opacity-0 scale-95 translate-y-4'
          )}
        >
          <div className="mb-12">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-xl shadow-accent/20 mx-auto mb-4">
              <span className="text-white text-3xl font-bold">
                {siteConfig.personal.name.charAt(0)}
              </span>
            </div>
            <h2 className="text-center text-ink font-semibold text-xl">
              {siteConfig.personal.name}
            </h2>
            <p className="text-center text-ink-muted text-sm mt-1">
              {siteConfig.personal.title}
            </p>
          </div>

          <nav className="flex flex-col items-center gap-2 w-full max-w-xs rounded-3xl bg-white/15 backdrop-blur-xl backdrop-saturate-150 border border-white/50 p-3 shadow-[0_12px_40px_rgba(15,23,42,0.08)] -translate-y-6">
            {navItems.map((item, index) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.href, item.id)}
                className={cn(
                  'w-full py-4 text-sm font-medium tracking-widest uppercase rounded-2xl transition-all duration-300 bg-white/25 backdrop-blur-md border border-white/50 shadow-[0_6px_20px_rgba(15,23,42,0.06)] hover:bg-white/45 hover:border-white/80 hover:shadow-[0_8px_24px_rgba(15,23,42,0.10)]',
                  activeSection === item.id
                    ? 'text-accent bg-accent/10 border-accent/20'
                    : 'text-ink-muted hover:text-ink'
                )}
                style={{
                  animationDelay: `${index * 50}ms`,
                  opacity: isOpen ? 1 : 0,
                  transform: isOpen ? 'translateY(0)' : 'translateY(20px)',
                  transition: `all 0.4s ease ${index * 50}ms`,
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="mt-0.01 flex gap-5">
            <a
              href={siteConfig.resume.path}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-sm font-medium bg-white/30 backdrop-blur-md backdrop-saturate-150 border border-white/60 text-ink shadow-[0_8px_25px_rgba(15,23,42,0.08)] transition-all duration-300 hover:bg-white/50 hover:border-white/80 hover:shadow-[0_10px_30px_rgba(15,23,42,0.12)] hover:-translate-y-0.5"
            >
              View Resume
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

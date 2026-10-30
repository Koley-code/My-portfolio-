
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { siteConfig } from '../lib/siteConfig';

export default function BlogNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Allow visitors to close the mobile menu with Escape.
  useEffect(() => {
    if (!menuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`blog-navbar ${scrolled ? 'blog-navbar-scrolled' : ''}`}
    >
      <div className="blog-navbar-inner">
        {/* Return to the main portfolio */}

        <Link href="/" className="blog-navbar-logo">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-accent-secondary flex items-center justify-center shadow-md shadow-accent/20">
            <span className="text-white text-sm font-bold">
              {siteConfig.personal.name.charAt(0)}
            </span>
          </div>

          <span className="hidden md:block text-sm font-semibold text-ink tracking-tight">
            {siteConfig.personal.name.split(' ')[0]}
          </span>
        </Link>


        {/* Blog identity */}
        <div className="blog-navbar-title">
          BLOG <span>/</span> JOURNAL
        </div>


        <nav className="blog-navbar-links" aria-label="Blog navigation">
          <Link href="/blog#top">HOME</Link>
          <Link href="/blog#articles">ARTICLES</Link>
        </nav>


        {/* Functional mobile menu button */}
        <button
          type="button"
          className={`blog-mobile-menu ${menuOpen ? 'blog-mobile-menu-open' : ''
            }`}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
          aria-controls="blog-mobile-panel"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav
          id="blog-mobile-panel"
          className="blog-mobile-panel"
          aria-label="Mobile navigation"
        >

          <Link href="/blog#top" onClick={closeMenu}>
            HOME <span>↗</span>
          </Link>

          <Link href="/blog#articles" onClick={closeMenu}>
            ARTICLES <span>↗</span>
          </Link>

        </nav>
      )}
    </header>
  );
}

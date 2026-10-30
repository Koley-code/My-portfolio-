'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Search, ExternalLink, FileText, Home, BookOpen, Wrench, Briefcase, Star, Award, Mail, Github, Linkedin } from 'lucide-react';
import { commandPaletteItems } from '../lib/siteConfig';

const iconMap: Record<string, React.ReactNode> = {
  Home: <Home className="w-4 h-4" />,
  Story: <BookOpen className="w-4 h-4" />,
  Skills: <Wrench className="w-4 h-4" />,
  Works: <Briefcase className="w-4 h-4" />,
  Promise: <Star className="w-4 h-4" />,
  Certificates: <Award className="w-4 h-4" />,
  Connect: <Mail className="w-4 h-4" />,
  GitHub: <Github className="w-4 h-4" />,
  LinkedIn: <Linkedin className="w-4 h-4" />,
  Resume: <FileText className="w-4 h-4" />,
};

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = query.trim()
    ? commandPaletteItems.filter((item) =>
        item.label.toLowerCase().includes(query.toLowerCase())
      )
    : commandPaletteItems;

  const handleSelect = useCallback((item: typeof commandPaletteItems[0]) => {
    setIsOpen(false);
    setQuery('');
    if (item.external) {
      window.open(item.href, '_blank', 'noopener,noreferrer')
    } else {
      const el = document.querySelector(item.href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
        setQuery('');
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
    setSelectedIndex(0);
  }, [isOpen, query]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex]);
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, filtered, selectedIndex, handleSelect]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10001] flex items-start justify-center pt-[20vh] px-4">
      <div className="absolute inset-0 bg-ink/20 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
      <div className="relative w-full max-w-lg glass-strong rounded-2xl overflow-hidden shadow-2xl">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200/60">
          <Search className="w-5 h-5 text-ink-muted" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command..."
            className="flex-1 bg-transparent outline-none text-ink placeholder:text-ink-light text-sm"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 rounded-md bg-slate-100 text-ink-muted text-xs font-mono border border-slate-200">
            ESC
          </kbd>
        </div>
        <div className="max-h-[320px] overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-ink-muted text-sm">No commands found</div>
          ) : (
            filtered.map((item, index) => (
              <button
                key={item.label}
                onClick={() => handleSelect(item)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                  index === selectedIndex ? 'bg-accent/10' : 'hover:bg-slate-50'
                }`}
              >
                <span className="text-ink-muted">
                  {iconMap[item.label] || <ExternalLink className="w-4 h-4" />}
                </span>
                <span className="flex-1 text-sm text-ink">{item.label}</span>
                {item.external && <ExternalLink className="w-3 h-3 text-ink-light" />}
                <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded bg-slate-100 text-ink-light text-xs font-mono">
                  {item.shortcut}
                </kbd>
              </button>
            ))
          )}
        </div>
        <div className="px-4 py-2 border-t border-slate-200/60 text-ink-light text-xs flex items-center justify-between">
          <span>Navigate with ↑↓</span>
          <span>Select with Enter</span>
        </div>
      </div>
    </div>
  );
}

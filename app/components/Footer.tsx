'use client';

import { siteConfig } from '../lib/siteConfig';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative py-16 sm:py-20 border-t border-slate-200/50">
            <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 text-center">

                {/* Initials / Logo */}
                <div className="mb-8">
                    <span className="inline-block text-4xl sm:text-5xl font-bold tracking-tight text-gradient">
                        SK
                    </span>
                </div>

                {/* Copyright */}
                <p className="text-ink-muted text-base sm:text-lg">
                    © {currentYear} {siteConfig.personal.name}. All rights reserved.
                </p>

                {/* Personal Tagline */}
                <p className="mt-4 text-ink-light text-sm sm:text-base">
                    Curiosity in mind, code in motion.
                </p>

            </div>
        </footer>
    );
}
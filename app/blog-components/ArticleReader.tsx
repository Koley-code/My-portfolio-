
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { BlogPost } from '../lib/blogData';
import CodeBlock from './CodeBlock';


type Props = {
    post: BlogPost;
    relatedPosts: BlogPost[];
    previousPost: BlogPost | null;
    nextPost: BlogPost | null;
};


export default function ArticleReader({
    post,
    relatedPosts,
    previousPost,
    nextPost,
}: Props) {
    const [activeId, setActiveId] = useState(
        post.sections[0]?.id ?? ''
    );
    const [progress, setProgress] = useState(0);
    const [tocOpen, setTocOpen] = useState(false);

    useEffect(() => {
        const updateProgress = () => {
            const scrollable =
                document.documentElement.scrollHeight -
                window.innerHeight;

            setProgress(
                scrollable > 0
                    ? Math.min(
                        100,
                        Math.max(0, (window.scrollY / scrollable) * 100)
                    )
                    : 0
            );
        };

        const headings = post.sections
            .map((section) => document.getElementById(section.id))
            .filter((heading): heading is HTMLElement => Boolean(heading));

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort(
                        (a, b) =>
                            a.boundingClientRect.top -
                            b.boundingClientRect.top
                    );

                if (visible[0]) {
                    setActiveId(visible[0].target.id);
                }
            },
            {
                rootMargin: '-15% 0px -70% 0px',
                threshold: 0,
            }
        );

        headings.forEach((heading) => observer.observe(heading));

        updateProgress();
        window.addEventListener('scroll', updateProgress, {
            passive: true,
        });
        window.addEventListener('resize', updateProgress);

        return () => {
            observer.disconnect();
            window.removeEventListener('scroll', updateProgress);
            window.removeEventListener('resize', updateProgress);
        };
    }, [post]);

    return (
        <main className="article-page">
            <div
                className="article-progress"
                role="progressbar"
                aria-label="Article reading progress"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(progress)}
                style={{ width: `${progress}%` }}
            />

            <header className="article-nav">
                <Link href="/" className="article-brand">
                    SK <span>SWARNENDU KOLEY</span>
                </Link>

                <Link href="/blog" className="article-back-link">
                    ← ALL ARTICLES
                </Link>
            </header>

            <header className="article-header">
                <div className="article-kicker">
                    <span>{post.category}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span>{post.readTime}</span>
                </div>

                <h1>{post.title}</h1>

                <p className="article-deck">{post.excerpt}</p>

                {post.image && (
                    <img
                        className="article-cover"
                        src={post.image}
                        alt={`Cover image for ${post.title}`}
                        fetchPriority="high"
                        decoding="async"
                    />
                )}

                <div className="article-cover-caption">
                    SWARNENDU'S DEVELOPMENT JOURNAL / {post.number}
                </div>
            </header>

            <div className="article-layout">
                <aside className="article-toc">
                    <button
                        className="article-toc-toggle"
                        type="button"
                        aria-expanded={tocOpen}
                        onClick={() => setTocOpen((open) => !open)}
                    >
                        <span>ON THIS PAGE</span>
                        <span>{tocOpen ? '−' : '+'}</span>
                    </button>

                    <nav
                        className={`article-toc-links ${tocOpen ? 'article-toc-open' : ''
                            }`}
                        aria-label="Table of contents"
                    >
                        {post.sections.map((section, index) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className={
                                    activeId === section.id
                                        ? 'article-toc-active'
                                        : ''
                                }
                                aria-current={activeId === section.id ? 'location' : undefined}
                                onClick={() => setTocOpen(false)}
                            >
                                <span>
                                    {String(index + 1).padStart(2, '0')}
                                </span>
                                {section.heading}
                            </a>
                        ))}
                    </nav>
                </aside>

                <article className="article-body">
                    <p className="article-introduction">
                        {post.introduction}
                    </p>

                    {post.sections.map((section) => (
                        <section
                            key={section.id}
                            className="article-section"
                        >
                            <h2 id={section.id}>{section.heading}</h2>

                            {section.paragraphs.map((paragraph, index) => (
                                <p key={index}>{paragraph}</p>
                            ))}

                            {section.bullets && (
                                <ul>
                                    {section.bullets.map((bullet) => (
                                        <li key={bullet}>{bullet}</li>
                                    ))}
                                </ul>
                            )}

                            {section.image && (
                                <figure>
                                    <img
                                        src={section.image}
                                        alt={section.imageAlt ?? section.heading}
                                        loading="lazy"
                                        decoding="async"
                                    />
                                    {section.imageAlt && (
                                        <figcaption>{section.imageAlt}</figcaption>
                                    )}
                                </figure>
                            )}

                            {section.code && (
                                <CodeBlock
                                    code={section.code}
                                    language={section.codeLanguage}
                                    title={section.codeTitle}
                                />
                            )}
                        </section>
                    ))}

                    <footer className="article-ending">
                        <span>THANKS FOR READING</span>
                        <p>
                            I'm still learning, building, and figuring things out.
                            More notes from that journey will be here.
                        </p>
                        <Link href="/blog">← BACK TO ALL ARTICLES</Link>
                    </footer>
                </article>
            </div>


            <nav
                className="article-pagination"
                aria-label="Navigate between articles"
            >
                {previousPost && (
                    <Link
                        href={`/blog/${previousPost.slug}`}
                        className="article-pagination-card article-pagination-previous"
                    >
                        <span className="article-pagination-label">
                            <span aria-hidden="true">←</span>
                            PREVIOUS ARTICLE
                        </span>

                        <h3>{previousPost.title}</h3>
                    </Link>
                )}

                {nextPost && (
                    <Link
                        href={`/blog/${nextPost.slug}`}
                        className="article-pagination-card article-pagination-next"
                    >
                        <span className="article-pagination-label">
                            NEXT ARTICLE
                            <span aria-hidden="true">→</span>
                        </span>

                        <h3>{nextPost.title}</h3>
                    </Link>
                )}
            </nav>

            <section className="article-related">
                <div className="article-related-heading">
                    <span>KEEP EXPLORING</span>
                    <h2>More from the journal.</h2>
                </div>

                <div className="article-related-grid">
                    {relatedPosts.map((related) => (
                        <Link
                            href={`/blog/${related.slug}`}
                            key={related.slug}
                            className="article-related-card"
                        >
                            <span>{related.category} · {related.readTime}</span>
                            <h3>{related.title}</h3>
                            <span className="article-related-arrow">READ ARTICLE ↗</span>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}

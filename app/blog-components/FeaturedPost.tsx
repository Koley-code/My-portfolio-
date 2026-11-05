'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import type { BlogPost } from '../lib/blogData';

type FeaturedPostProps = {
  post: BlogPost;
};

export default function FeaturedPost({ post }: FeaturedPostProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="blog-featured">
      <div className="blog-section-heading">
        <span className="blog-section-number">01</span>

        <div className="blog-section-heading-line" />

        <span className="blog-section-heading-text">
          FEATURED STORY
        </span>
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="blog-featured-link"
        aria-label={`Read article: ${post.title}`}
      >
        <div className="blog-featured-visual">
          {!imageError && post.image ? (
            <Image
              src={post.image}
              alt={`Featured article: ${post.title}`}
              width={1080}
              height={939}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={80}
              priority
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="blog-featured-placeholder">
              <div className="blog-abstract-grid" />
              <span>SWARNENDU / 2026</span>
            </div>
          )}

          <div className="blog-featured-visual-overlay" />

          <span className="blog-featured-corner">
            EDITOR'S PICK
          </span>
        </div>

        <div className="blog-featured-content">
          <div className="blog-featured-meta">
            <span>{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.date}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>

          <h2>{post.title}</h2>

          <p>{post.excerpt}</p>

          <div className="blog-read-link">
            <span>READ THE STORY</span>

            <span
              className="blog-read-arrow"
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
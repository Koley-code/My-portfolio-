'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { BlogPost } from '../lib/blogData';
import Image from 'next/image';

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
          FEATURED
        </span>
      </div>

      <Link
        href={`/blog/${post.slug}`}
        className="blog-featured-link"
      >
        <div className="blog-featured-visual">
          {!imageError && post.image ? (

            <Image
              src={post.image}
              alt={`Featured article: ${post.title}`}
              width={1080}
              height={939}
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={75}
              loading="lazy"
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
            FEATURED
          </span>
        </div>

        <div className="blog-featured-content">
          <div className="blog-featured-meta">
            <span>{post.category}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>

          <h2>{post.title}</h2>

          <p>{post.excerpt}</p>

          <div className="blog-read-link">
            <span>READ ARTICLE</span>

            <span className="blog-read-arrow">
              →
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}
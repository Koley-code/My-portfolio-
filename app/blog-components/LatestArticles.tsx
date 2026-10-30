
'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import type { BlogPost } from '../lib/blogData';

type LatestArticlesProps = {
  posts: BlogPost[];
};

export default function LatestArticles({
  posts,
}: LatestArticlesProps) {
  const [activePost, setActivePost] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');


  const [keyboardNavigation, setKeyboardNavigation] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setKeyboardNavigation(true);
      }
    };

    const handlePointerDown = () => {
      setKeyboardNavigation(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  // Build the category buttons from the existing article data.
  const categories = useMemo(
    () => ['All', ...Array.from(new Set(posts.map((post) => post.category)))],
    [posts]
  );

  // Filter by category and search title, description, or category.
  const filteredPosts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesCategory =
        activeCategory === 'All' ||
        post.category === activeCategory;

      const searchableText = [
        post.title,
        post.excerpt,
        post.category,
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch =
        query.length === 0 || searchableText.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [posts, searchQuery, activeCategory]);

  function clearFilters() {
    setSearchQuery('');
    setActiveCategory('All');
    setActivePost(null);
  }

  return (
    <section
      className={`blog-latest ${keyboardNavigation ? 'blog-keyboard-navigation' : ''
        }`}
      aria-labelledby="latest-articles-title"
    >
      <div className="blog-section-heading">
        <span className="blog-section-number">02</span>

        <div className="blog-section-heading-line" />

        <span
          id="latest-articles-title"
          className="blog-section-heading-text"
        >
          LATEST ARTICLES
        </span>
      </div>

      {/* Search and category filters */}
      <div className="blog-latest-tools">
        <label className="blog-search-wrap">
          <span className="blog-search-icon" aria-hidden="true">
            ⌕
          </span>

          <span className="blog-visually-hidden">
            Search articles by title, description, or category
          </span>

          <input
            type="search"
            className="blog-search-input"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>

        <div
          className="blog-category-filters"
          role="group"
          aria-label="Filter articles by category"
        >
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`blog-category-button ${activeCategory === category
                ? 'blog-category-button-active'
                : ''
                }`}
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div
          className="blog-results-count"
          aria-live="polite"
          aria-atomic="true"
        >
          {filteredPosts.length}{' '}
          {filteredPosts.length === 1 ? 'ARTICLE' : 'ARTICLES'}
          {searchQuery.trim() || activeCategory !== 'All'
            ? ' FOUND'
            : ''}
        </div>
      </div>

      {/* Article list */}
      {filteredPosts.length > 0 ? (
        <div className="blog-latest-list">
          {filteredPosts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className={`blog-latest-item ${activePost === post.slug
                ? 'blog-latest-item-active'
                : ''
                }`}
              onMouseEnter={() => setActivePost(post.slug)}
              onMouseLeave={() => setActivePost(null)}
              onFocus={() => setActivePost(post.slug)}
              onBlur={() => setActivePost(null)}
            >
              <div className="blog-latest-number">
                {post.number}
              </div>

              <div className="blog-latest-date">
                {post.date}
              </div>

              <div className="blog-latest-main">
                <h3>{post.title}</h3>

                <div className="blog-latest-info">
                  <span>{post.category}</span>
                  <span aria-hidden="true">·</span>
                  <span>{post.readTime}</span>
                </div>
              </div>

              <div className="blog-latest-preview">
                {post.imageType === 'project' && post.image ? (
                  <img
                    src={post.image}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <div
                    className="blog-latest-abstract"
                    aria-hidden="true"
                  >
                    <span>{post.number}</span>
                  </div>
                )}
              </div>

              <div className="blog-latest-arrow" aria-hidden="true">
                ↗
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="blog-no-results" role="status">
          <span className="blog-no-results-mark" aria-hidden="true">
            404
          </span>

          <h3>No articles found</h3>

          <p>
            Nothing matches your search just yet. Try another keyword
            or choose a different category.
          </p>

          <button
            type="button"
            className="blog-clear-filters"
            onClick={clearFilters}
          >
            Clear search & filters
            <span aria-hidden="true"> ↗</span>
          </button>
        </div>
      )}
    </section>
  );
}

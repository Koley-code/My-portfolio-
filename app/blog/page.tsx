import BlogNavbar from '../blog-components/BlogNavbar';
import FeaturedPost from '../blog-components/FeaturedPost';
import LatestArticles from '../blog-components/LatestArticles';
import { featuredPost, latestPosts } from '../lib/blogData';

export default function BlogPage() {
  return (
    <main className="blog-page">
      <BlogNavbar />

      {/* HERO */}
      <section className="blog-hero" id="top">
        <div className="blog-hero-grid" />

        <div className="blog-hero-content">
          <div className="blog-hero-label">
            <span className="blog-hero-label-line" />
            <span>/ BLOG · JOURNAL</span>
          </div>

          <h1 className="blog-hero-title">
            <span>BUILD.</span>
            <span>LEARN.</span>
            <span>SHARE.</span>
          </h1>

          <div className="blog-hero-intro">
            <h2>Hey, I'm Swarnendu.</h2>

            <p>
              This is where I write about the things I'm building,
              the problems I run into, and the lessons I pick up
              along the way.
            </p>
          </div>

          <a
            href="#articles"
            className="blog-hero-button"
          >
            <span>EXPLORE ARTICLES</span>
            <span className="blog-hero-arrow">↓</span>
          </a>
        </div>

        <div className="blog-hero-meta">
          <span className="blog-hero-year">2026</span>

          <span className="blog-hero-meta-line" />

          <span className="blog-hero-meta-text">
            DEV
            <br />
            JOURNAL
          </span>
        </div>

        <div className="blog-hero-scroll">
          <span>SCROLL TO EXPLORE</span>
          <span className="blog-hero-scroll-line" />
        </div>
      </section>

      {/* ARTICLES */}
      <section
        id="articles"
        className="blog-content"
      >
        <FeaturedPost post={featuredPost} />

        <LatestArticles posts={latestPosts} />
      </section>
    </main>
  );
}
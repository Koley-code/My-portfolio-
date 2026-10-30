
import { notFound } from 'next/navigation';
import { blogPosts } from '../../lib/blogData';
import ArticleReader from '../../blog-components/ArticleReader';

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}


export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return { title: 'Article Not Found' };
  }

  const articleUrl = `/blog/${post.slug}`;
  const socialImage = post.image;

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      type: 'article',
      url: articleUrl,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      images: [
        {
          url: socialImage,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [socialImage],
    },
  };
}


export default async function ArticlePage({
  params,
}: ArticlePageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    notFound();
  }


  const currentIndex = blogPosts.findIndex(
    (item) => item.slug === post.slug
  );

  const previousPost =
    currentIndex > 0
      ? blogPosts[currentIndex - 1]
      : null;

  const nextPost =
    currentIndex >= 0 && currentIndex < blogPosts.length - 1
      ? blogPosts[currentIndex + 1]
      : null;

  const relatedPosts = blogPosts
    .filter(
      (item) =>
        item.slug !== post.slug &&
        item.slug !== previousPost?.slug &&
        item.slug !== nextPost?.slug
    )
    .slice(0, 3);

  return (
    <ArticleReader
      post={post}
      relatedPosts={relatedPosts}
      previousPost={previousPost}
      nextPost={nextPost}
    />
  );

}

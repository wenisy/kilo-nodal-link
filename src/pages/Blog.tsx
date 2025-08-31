import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Blog: React.FC = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t('blog.title')} - Context Engineering`;
  }, [t]);

  const blogPosts = t('blog.posts', { returnObjects: true }) as any[];

  return (
    <div className="blog">
      <div className="container">
        <h1>{t('blog.title')}</h1>
        <p className="blog-subtitle">{t('blog.subtitle')}</p>

        <div className="blog-grid">
          {blogPosts.map((post: any) => (
            <article key={post.id} className="blog-card">
              <div className="blog-meta">
                <span className="blog-category">{post.category}</span>
                <span className="blog-date">{post.date}</span>
                <span className="blog-read-time">{post.readTime}</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
              <button className="read-more-btn">{t('blog.readMore')}</button>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
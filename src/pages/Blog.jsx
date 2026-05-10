import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { blogPosts, popularArticles } from '../data/blog';
import '../styles/Blog.css';

export const BlogList = () => {
  return (
    <div className="blog-page">
      <Header />
      <div className="container">
        <div className="blog-container">
          <h1 className="blog-title">Блог</h1>
          <div className="blog-grid">
            {blogPosts.map(post => (
              <Link to={`/blog/${post.id}`} key={post.id} className="blog-card">
                <div className="blog-card-img">
                  <img src={post.image} alt={post.title} />
                </div>
                <div className="blog-card-body">
                  <h3 className="blog-card-title">{post.title}</h3>
                  <div className="blog-card-date">📅 {post.date}</div>
                </div>
              </Link>
            ))}
          </div>
          <button className="blog-load-more">Загрузить ещё...</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const BlogArticle = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === parseInt(id)) || blogPosts[0];

  return (
    <div className="blog-page">
      <Header />
      <div className="container">
        <div className="article-layout">
          <div className="article-main">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <h1 className="article-title" style={{ marginBottom: 0 }}>{post.title}</h1>
              <Link to="/blog" className="article-back-link">← Вернуться назад</Link>
            </div>
            <div className="article-image">
              <img src={post.image} alt={post.title} />
            </div>
            <div className="article-content">
              {post.content.split('\n\n').map((para, i) => {
                if (para.startsWith('Статус') || para.startsWith('Рецептор')) {
                  return <h3 key={i}>{para.split('\n')[0]}</h3>;
                }
                return <p key={i}>{para}</p>;
              })}
            </div>
          </div>

          <div className="article-sidebar">
            <div className="article-popular">
              <h4>Лучшие статьи</h4>
              <ul>
                {popularArticles.map(art => (
                  <li key={art.id}>{art.title}</li>
                ))}
              </ul>
            </div>

            <div className="article-sidebar-contacts">
              <h4>Контакты</h4>
              <p>Тел.: +7 (701) 081-6040</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+7 (727) 081-6040</p>
              <p>Email: <a href="mailto:info@smartmedservice.com">info@smartmedservice.com</a></p>
            </div>

            <div className="article-sidebar-promo">
              <img
                src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?w=300&h=120&fit=crop"
                alt="Акция"
              />
              <div className="article-sidebar-promo-text">
                При прохождении диагностики в больнице Северанс до 31 августа{' '}
                <span>20% скидки.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default BlogList;

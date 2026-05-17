import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { promotions } from '../data/promotions';
import '../styles/Promotions.css';

export const PromotionsList = () => {
  return (
    <div className="promotions-page">
      <Header />
      <div className="container">
        <div className="promotions-container">
          <h1 className="promotions-title">Акции</h1>
          <div className="promotions-grid">
            {promotions.map(promo => (
              <Link to={`/promotions/${promo.id}`} key={promo.id} className="promo-card">
                <div className="promo-card-img">
                  <img src={promo.image} alt={promo.title} />
                </div>
                <div className="promo-card-body">
                  <p className="promo-card-title">
                    При прохождении диагностики в больнице Северанс до 31 августа{' '}
                    <span>{promo.discount} скидки.</span>
                  </p>
                  <div className="promo-card-date">
                    <span>📅</span> {promo.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export const PromotionDetail = () => {
  const { id } = useParams();
  const promo = promotions.find(p => p.id === parseInt(id)) || promotions[0];
  const related = promotions.filter(p => p.id !== promo.id).slice(0, 3);

  return (
    <div className="promotions-page">
      <Header />
      <div className="container">
        <div className="promo-detail-layout">
          <div className="promo-detail-main">
            <Link to="/promotions" className="promo-back-link">
              ← Вернуться назад
            </Link>
            <h1 className="promo-detail-title">
              При прохождении диагностики в больнице Северанс до 31 августа{' '}
              <span>{promo.discount} скидки.</span>
            </h1>
            <div className="promo-detail-content">
              <div className="promo-detail-text">
                <p>{promo.description}</p>
              </div>
              <div className="promo-detail-image">
                <img src={promo.image} alt={promo.title} />
              </div>
            </div>
            <div className="promo-validity">
              ★ Акция действует до <span>{promo.validUntil}</span>
            </div>
            <Link to={`/request/1`}>
              <button className="promo-submit-btn">Отправить запрос &gt;</button>
            </Link>

            <div className="promo-related">
              <div className="promo-related-title">Другие акции</div>
              <div className="promo-related-grid">
                {related.map(r => (
                  <Link to={`/promotions/${r.id}`} key={r.id} className="promo-related-card">
                    <div className="promo-related-img">
                      <img src={r.image} alt={r.title} />
                    </div>
                    <p className="promo-related-text">
                      При прохождении диагностики в больнице Северанс до 31 августа{' '}
                      <span>{r.discount} скидки.</span>
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="promo-sidebar">
            <div className="promo-sidebar-contacts">
              <h4>Контакты</h4>
              <p>Тел.: +7 (701) 081-6040</p>
              <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+7 (727) 081-6040</p>
              <p>Email: <a href="mailto:info@smartmedservice.com">info@smartmedservice.com</a></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PromotionsList;

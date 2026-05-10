import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import StarRating from '../components/StarRating';
import { clinics, clinicPrices, clinicDoctors, clinicReviews } from '../data/clinics';
import '../styles/Clinic.css';

const ClinicDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('about');

  const clinic = clinics.find(c => c.id === parseInt(id)) || clinics[0];
  const prices = clinicPrices[clinic.id] || clinicPrices[1];

  return (
    <div className="clinic-detail-page">
      <Header />
      <div className="container">
        <div className="clinic-detail-layout">
          <Sidebar />
          <main className="clinic-detail-main">
            <h1 className="clinic-detail-title">{clinic.name}</h1>

            <div className="clinic-info-card">
              <div className="clinic-info-text">
                <div className="clinic-name-en">{clinic.englishName}</div>
                <div className="clinic-address">
                  <span className="clinic-address-icon">📍</span>
                  <span>{clinic.location}<br />{clinic.address}</span>
                </div>
                <div className="clinic-rating-row">
                  <StarRating rating={clinic.rating} />
                  <span className="clinic-review-count">{clinic.reviewCount} отзывов</span>
                </div>
                <div className="clinic-tabs" style={{ borderBottom: 'none', marginBottom: 0 }}>
                  {['about', 'prices', 'doctors', 'reviews'].map(tab => {
                    const labels = { about: 'О больнице', prices: 'Цены', doctors: 'Доктора', reviews: 'Отзывы' };
                    return (
                      <button
                        key={tab}
                        className={`clinic-tab ${activeTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveTab(tab)}
                        style={{ padding: '8px 16px' }}
                      >
                        {labels[tab]}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="clinic-info-image">
                <img src={clinic.image} alt={clinic.name} />
              </div>
            </div>

            {activeTab === 'about' && (
              <div>
                <div className="clinic-about-text">
                  {clinic.description.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <Link to={`/request/${clinic.id}`}>
                  <button className="clinic-submit-btn">Отправить запрос &gt;</button>
                </Link>
              </div>
            )}

            {activeTab === 'prices' && (
              <div>
                {prices.map((cat, i) => (
                  <div key={i} className="price-category">
                    <div className="price-cat-header">
                      <span className="price-cat-icon">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"/>
                          <line x1="12" y1="8" x2="12" y2="16"/>
                          <line x1="8" y1="12" x2="16" y2="12"/>
                        </svg>
                      </span>
                      <h4>{cat.category}</h4>
                    </div>
                    {cat.items.map((item, j) => (
                      <div key={j} className="price-row">
                        <span>{item.name}</span>
                        <span className="price-amount">{item.price}</span>
                        <span>{item.nameRight}</span>
                        <span className="price-amount">{item.priceRight}</span>
                      </div>
                    ))}
                  </div>
                ))}
                <Link to={`/request/${clinic.id}`}>
                  <button className="clinic-submit-btn">Отправить запрос &gt;</button>
                </Link>
              </div>
            )}

            {activeTab === 'doctors' && (
              <div>
                <div className="doctors-grid">
                  {clinicDoctors.map(doctor => (
                    <div key={doctor.id} className="doctor-card">
                      <div className="doctor-avatar">
                        <img src={doctor.image} alt={doctor.name} />
                      </div>
                      <div className="doctor-name">{doctor.name}</div>
                      <div className="doctor-specialty">{doctor.specialty}</div>
                      <div className="doctor-clinic">{doctor.clinic}</div>
                      <div className="doctor-clinic-sub">{doctor.subClinic}</div>
                    </div>
                  ))}
                </div>
                <Link to={`/request/${clinic.id}`}>
                  <button className="clinic-submit-btn">Отправить запрос &gt;</button>
                </Link>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="reviews-grid">
                  {clinicReviews.map(review => (
                    <div key={review.id} className="review-card">
                      <div className="review-header">
                        <span className="review-author">{review.author}</span>
                        <span className="review-date">{review.date}</span>
                      </div>
                      <div className="review-stars">
                        <StarRating rating={review.rating} />
                      </div>
                      <p className="review-text">{review.text}</p>
                    </div>
                  ))}
                </div>
                <Link to={`/request/${clinic.id}`}>
                  <button className="clinic-submit-btn">Отправить запрос &gt;</button>
                </Link>
              </div>
            )}
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClinicDetail;

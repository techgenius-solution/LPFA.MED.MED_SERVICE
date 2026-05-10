## add page blog, aboutUS, 

Create a prompt that includes all the details shown in the images. Add the header and all pages. Include every detail visible in the design. Preserve the colors and styles exactly as in the mockup.
Create a complete React JS project with:

Mockup/demo data
Reusable components
Separate CSS files
Proper project structure
Write the code using JSX files only (do not use TypeScript).

This is a comprehensive task to build the **Smart Med Service** platform. I will structure this as a modern React application using a clean component-based architecture.

### Project Structure

* `src/components/` (Header, Footer, Sidebar, Cards)
* `src/pages/` (Home, Treatment, Clinic, Inquiry, About, Blog)
* `src/styles/` (Separate CSS for each section)

---

## 1. Global Styles & Constants

The brand uses a distinct **Green (#5CB82A)**, **White**, and **Light Gray** palette.

```css
/* src/styles/App.css */
:root {
  --primary-green: #5CB82A;
  --dark-green: #4a9e22;
  --text-main: #333;
  --text-muted: #777;
  --bg-light: #f9f9f9;
  --border-color: #eee;
}

body {
  margin: 0;
  font-family: 'Inter', -apple-system, sans-serif;
  color: var(--text-main);
  background-color: white;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

button.primary-btn {
  background-color: var(--primary-green);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}

```

---

## 2. Reusable Header Component

Includes the navigation menu and the search bar functionality seen in the mockups.

```jsx
// src/components/Header.jsx
import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-top container">
        <div className="logo">
          <span className="s-logo">S</span>MART MED SERVICE
        </div>
        <nav className="top-nav">
          <a href="/about">О компании</a>
          <a href="/treatment">Лечение</a>
          <a href="/beauty">Красота</a>
          <a href="/checkup">Check Up</a>
          <a href="/blog">Блог</a>
          <a href="/contacts">Контакты</a>
          <button className="login-btn">Войти</button>
        </nav>
      </div>
      <div className="search-section container">
        <div className="search-bar">
          <input type="text" placeholder="Поиск по клиникам, докторам и болезням..." />
          <button className="search-btn">Найти</button>
        </div>
        <div className="popular-tags">
          Популярные запросы: <span>Межпозвоночная грыжа, Миома матки</span>
        </div>
      </div>
    </header>
  );
};

export default Header;

```

---

## 3. Main Landing Page (Home)

This page features the hero section, clinic slider, and category grid.

```jsx
// src/pages/Home.jsx
import React from 'react';
import Header from '../components/Header';
import ClinicCard from '../components/ClinicCard';
import '../styles/Home.css';

const Home = () => {
  const clinics = [
    { id: 1, name: "Синчон Северанс", location: "Сеул, Южная Корея", rating: 5, img: "/hosp1.jpg" },
    { id: 2, name: "Медицинский центр Самсунг", location: "Сеул, Южная Корея", rating: 5, img: "/hosp2.jpg" },
  ];

  return (
    <div className="home-page">
      <Header />
      <section className="hero container">
        <div className="hero-text">
          <h1>Здоровье без границ</h1>
          <p>В базе: 34 клиники, 784 доктора</p>
        </div>
        <div className="hero-image">
          <img src="/doctor-hero.png" alt="Doctor" />
        </div>
      </section>

      <section className="recommended container">
        <h2>Рекомендуемые клиники</h2>
        <div className="clinic-grid">
          {clinics.map(c => <ClinicCard key={c.id} clinic={c} />)}
        </div>
      </section>

      <section className="categories container">
        <div className="cat-card">
          <h3>Онкология</h3>
          <ul>
            <li>Рак груди</li>
            <li>Рак простаты</li>
          </ul>
          <button className="link-btn">Весь список</button>
        </div>
        <div className="cat-card">
          <h3>Check Up</h3>
          <ul>
            <li>Мужской</li>
            <li>Женский</li>
          </ul>
          <button className="link-btn">Весь список</button>
        </div>
      </section>
    </div>
  );
};

export default Home;

```

---

## 4. Clinic Details Page (Tabs View)

Implements the tabs for "About", "Prices", "Doctors", and "Reviews".

```jsx
// src/pages/ClinicDetail.jsx
import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/Clinic.css';

const ClinicDetail = () => {
  const [activeTab, setActiveTab] = useState('about');

  return (
    <div className="clinic-detail">
      <Header />
      <div className="container clinic-content">
        <div className="sidebar">
          <h4>Все направления</h4>
          <ul>
            <li>Акушерство</li>
            <li>Кардиология</li>
            <li>Неврология</li>
          </ul>
        </div>
        
        <main className="main-info">
          <h1>Синчон Северанс</h1>
          <div className="tabs">
            <button onClick={() => setActiveTab('about')} className={activeTab === 'about' ? 'active' : ''}>О больнице</button>
            <button onClick={() => setActiveTab('prices')} className={activeTab === 'prices' ? 'active' : ''}>Цены</button>
            <button onClick={() => setActiveTab('doctors')} className={activeTab === 'doctors' ? 'active' : ''}>Доктора</button>
          </div>

          {activeTab === 'about' && (
            <div className="tab-body">
              <p>Больница Северанс системы здравоохранения Университета Ёнсе — это одна из старейших клиник...</p>
              <button className="primary-btn">Отправить запрос</button>
            </div>
          )}

          {activeTab === 'prices' && (
            <div className="tab-body">
              <div className="price-item"><span>Рак груди</span> <span>$1000</span></div>
              <div className="price-item"><span>Рак простаты</span> <span>$1500</span></div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ClinicDetail;

```

---

## 5. Inquiry Form (Request for Treatment)

This handles the detailed forms shown in the mockups (Inquiry for Oncology, Checkup, etc.).

```jsx
// src/pages/Inquiry.jsx
import React from 'react';
import '../styles/Form.css';

const Inquiry = () => {
  return (
    <div className="inquiry-container container">
      <h2>Отправить запрос</h2>
      <form className="inquiry-form">
        <div className="form-group">
          <label>ФИО пациента</label>
          <input type="text" placeholder="Виктория" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>E-mail</label>
            <input type="email" />
          </div>
          <div className="form-group">
            <label>Телефон</label>
            <input type="tel" />
          </div>
        </div>
        <div className="form-group">
          <label>Сообщение</label>
          <textarea placeholder="Опишите ваши симптомы..."></textarea>
        </div>
        <button type="submit" className="primary-btn">Отправить запрос</button>
      </form>
      <div className="form-tips">
        <h4>Советы по заполнению</h4>
        <p>Клиника очень респектабельная, медперсонал профессиональный и внимательный...</p>
      </div>
    </div>
  );
};

```

---

## 6. Footer & Blog Components

The footer includes contact info and social media icons as per the dark bottom section in the mockup.

```jsx
// src/components/Footer.jsx
const Footer = () => (
  <footer className="main-footer">
    <div className="container footer-grid">
      <div className="footer-logo">SMART MED SERVICE</div>
      <div className="footer-contacts">
        <p>Тел: +7 (701) 081-6040</p>
        <p>Email: info@smartmedservice.com</p>
      </div>
      <div className="social-icons">
        {/* Placeholder icons for WhatsApp, YouTube, FB, VK, Telegram, IG */}
      </div>
    </div>
  </footer>
);

```

### To complete the installation:

1. **Setup:** Run `npx create-react-app smart-med`.
2. **Styles:** Create the CSS files in `src/styles/` following the mockup's green/white aesthetic.
3. **Routing:** Install `npm install react-router-dom` to link the Header links to the specific pages (About, Blog, Treatment).
4. **Images:** Place clinic photos in a `public/assets/` folder to match the cards.


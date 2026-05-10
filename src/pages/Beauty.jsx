import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import '../styles/Treatment.css';

const beautyGroups = [
  {
    id: 1,
    name: "Акушерство",
    items: [["Рак груди", "Меланома"], ["Рак простаты", "Рак желудка"], ["Рак легких", "Рак поджелудочной железы"]],
  },
  {
    id: 2,
    name: "Андрология",
    items: [["Рак груди", "Меланома"], ["Рак простаты", "Рак желудка"], ["Рак легких", "Рак поджелудочной железы"]],
  },
  {
    id: 3,
    name: "Аллергология",
    items: [["Рак груди", "Меланома"], ["Рак простаты", "Рак желудка"], ["Рак легких", "Рак поджелудочной железы"]],
  },
  {
    id: 4,
    name: "Гастроэнтерология",
    items: [["Рак груди", "Меланома"], ["Рак простаты", "Рак желудка"], ["Рак легких", "Рак поджелудочной железы"]],
  },
];

const Beauty = () => {
  return (
    <div className="treatment-page">
      <Header />
      <div className="container">
        <div className="treatment-layout">
          <Sidebar />
          <main className="treatment-main">
            <h1>Красота</h1>
            <div className="treatment-search">
              <input type="text" placeholder="Поиск по..." />
              <button>🔍</button>
            </div>
            <div className="treatment-categories">
              {beautyGroups.map(group => (
                <div key={group.id} className="treat-cat">
                  <div className="treat-cat-header">
                    <span className="treat-cat-icon" style={{ color: '#3db54a' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                      </svg>
                    </span>
                    <h3>{group.name}</h3>
                  </div>
                  <div className="treat-cat-grid">
                    {group.items.map((pair, i) => (
                      <React.Fragment key={i}>
                        <span className="treat-cat-item">{pair[0]}</span>
                        <span className="treat-cat-item">{pair[1]}</span>
                      </React.Fragment>
                    ))}
                  </div>
                  <Link to="/beauty" className="treat-show-all">Посмотреть все клиники</Link>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Beauty;

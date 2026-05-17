import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import '../styles/Treatment.css';

const checkupGroups = [
  {
    id: 1,
    name: "Check Up",
    items: [["Рак груди", "Меланома"], ["Рак простаты", "Рак желудка"], ["Рак легких", "Рак поджелудочной железы"]],
  },
  {
    id: 2,
    name: "Онкология",
    items: [["Рак груди", "Меланома"], ["Рак простаты", "Рак желудка"], ["Рак легких", "Рак поджелудочной железы"]],
  },
];

const CheckUp = () => {
  return (
    <div className="treatment-page">
      <Header />
      <div className="container">
        <div className="treatment-layout">
          <Sidebar />
          <main className="treatment-main">
            <h1>Check Up</h1>
            <div className="treatment-search">
              <input type="text" placeholder="Поиск по..." />
              <button>🔍</button>
            </div>
            <div className="treatment-categories">
              {checkupGroups.map(group => (
                <div key={group.id} className="treat-cat">
                  <div className="treat-cat-header">
                    <span className="treat-cat-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"/>
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
                  <Link to="/checkup" className="treat-show-all">Посмотреть все клиники</Link>
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

export default CheckUp;

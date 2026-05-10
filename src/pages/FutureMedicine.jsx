import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import '../styles/Treatment.css';

const futureGroups = [
  {
    id: 1,
    name: "Робот Да Винчи",
    items: [["Рак груди", "Меланома"], ["Рак простаты", "Рак желудка"], ["Рак легких", "Рак поджелудочной железы"]],
  },
  {
    id: 2,
    name: "Протонная терапия",
    items: [["Рак груди", "Меланома"], ["Рак простаты", "Рак желудка"], ["Рак легких", "Рак поджелудочной железы"]],
  },
  {
    id: 3,
    name: "Генная терапия",
    items: [["Рак груди", "Меланома"], ["Рак простаты", "Рак желудка"]],
  },
];

const FutureMedicine = () => {
  return (
    <div className="treatment-page">
      <Header />
      <div className="container">
        <div className="treatment-layout">
          <Sidebar />
          <main className="treatment-main">
            <h1>Медицина будущего</h1>
            <div className="treatment-categories">
              {futureGroups.map(group => (
                <div key={group.id} className="treat-cat">
                  <div className="treat-cat-header">
                    <span className="treat-cat-icon" style={{ color: '#3db54a' }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
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
                  <Link to="/future" className="treat-show-all">Посмотреть все клиники</Link>
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

export default FutureMedicine;

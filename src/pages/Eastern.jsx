import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import '../styles/Treatment.css';

const easternGroups = [
  {
    id: 1,
    name: "Традиционная медицина",
    items: [["Акупунктура", "Фитотерапия"], ["Массаж", "Рефлексотерапия"], ["Моксотерапия", "Су-Джок"]],
  },
  {
    id: 2,
    name: "Оздоровительные программы",
    items: [["Программа 1", "Программа 4"], ["Программа 2", "Программа 5"], ["Программа 3", "Программа 6"]],
  },
];

const Eastern = () => {
  return (
    <div className="treatment-page">
      <Header />
      <div className="container">
        <div className="treatment-layout">
          <Sidebar />
          <main className="treatment-main">
            <h1>Восточная медицина</h1>
            <div className="treatment-categories">
              {easternGroups.map(group => (
                <div key={group.id} className="treat-cat">
                  <div className="treat-cat-header">
                    <span className="treat-cat-icon">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
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
                  <Link to="/eastern" className="treat-show-all">Посмотреть все клиники</Link>
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

export default Eastern;

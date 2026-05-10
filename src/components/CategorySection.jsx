import React from 'react';
import { Link } from 'react-router-dom';

const CategorySection = ({ category, showViewAll = true }) => {
  return (
    <div className="cat-section">
      <div className="cat-section-header">
        <span className="cat-icon">
          {category.icon === '🔬' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          ) : category.icon === '✓' ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
          )}
        </span>
        <h3>{category.name}</h3>
      </div>
      <div className="cat-grid">
        {(category.items || category.subItems || []).map((item, idx) => (
          <React.Fragment key={idx}>
            <span className="cat-grid-item">{item.left}</span>
            <span className="cat-grid-item">{item.right}</span>
          </React.Fragment>
        ))}
      </div>
      {showViewAll && (
        <Link to={`/treatment?direction=${category.name}`} className="cat-show-all">
          Посмотреть все клиники
        </Link>
      )}
    </div>
  );
};

export default CategorySection;

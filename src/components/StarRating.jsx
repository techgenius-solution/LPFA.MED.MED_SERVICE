import React from 'react';

const StarRating = ({ rating = 5, max = 5 }) => {
  return (
    <span className="stars">
      {Array.from({ length: max }, (_, i) => (
        <span key={i} style={{ color: i < rating ? '#f5c518' : '#ddd' }}>★</span>
      ))}
    </span>
  );
};

export default StarRating;

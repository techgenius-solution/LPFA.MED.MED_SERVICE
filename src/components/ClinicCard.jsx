import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import '../styles/ClinicCard.css';

const ClinicCard = ({ clinic }) => {
  return (
    <Link to={`/clinic/${clinic.id}`} className="clinic-card">
      <div className="clinic-card-img">
        <img src={clinic.image} alt={clinic.name} />
      </div>
      <div className="clinic-card-body">
        <h4 className="clinic-card-name">{clinic.name}</h4>
        <p className="clinic-card-location">📍 {clinic.location}</p>
        <StarRating rating={clinic.rating} />
      </div>
    </Link>
  );
};

export default ClinicCard;

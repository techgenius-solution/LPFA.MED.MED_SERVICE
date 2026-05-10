import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clinicDirections } from '../data/clinics';

const Sidebar = ({ active }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const filtered = clinicDirections.filter(d =>
    d.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="sidebar">
      <div className="sidebar-search">
        <input
          type="text"
          placeholder="Поиск по диагнозу..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button>🔍</button>
      </div>

      <ul className="sidebar-list">
        <li
          className={`sidebar-all ${!active || active === 'all' ? 'active' : ''}`}
          onClick={() => navigate('/treatment')}
        >
          <span>⊕</span> Все направления
        </li>
        {filtered.slice(1).map(dir => (
          <li
            key={dir}
            className={active === dir ? 'active' : ''}
            onClick={() => navigate(`/treatment?direction=${encodeURIComponent(dir)}`)}
          >
            {dir}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;

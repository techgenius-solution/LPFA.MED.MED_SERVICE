import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';

const initials = (name = '') =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() || '')
    .join('') || '?';

const UserDropdown = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', (e) => e.key === 'Escape' && setOpen(false));
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  if (!user) return null;

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/');
  };

  return (
    <div className="user-dd" ref={ref}>
      <button
        className="user-dd-trigger"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="user-dd-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt="" />
          ) : (
            <span>{initials(user.name)}</span>
          )}
        </span>
        <span className="user-dd-name">{user.name?.split(' ')[0]}</span>
        <svg
          className={`user-dd-caret ${open ? 'open' : ''}`}
          width="10"
          height="10"
          viewBox="0 0 12 12"
          fill="none"
        >
          <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="user-dd-menu" role="menu">
          <div className="user-dd-head">
            <div className="user-dd-avatar lg">
              {user.avatar ? <img src={user.avatar} alt="" /> : <span>{initials(user.name)}</span>}
            </div>
            <div>
              <div className="user-dd-fullname">{user.name}</div>
              <div className="user-dd-email">{user.email}</div>
              {!user.verified && (
                <Link to="/verify-email" className="user-dd-verify" onClick={() => setOpen(false)}>
                  Подтвердите email →
                </Link>
              )}
            </div>
          </div>
          <hr className="user-dd-sep" />
          <Link to="/profile" className="user-dd-item" onClick={() => setOpen(false)} role="menuitem">
            <span className="ico">👤</span> Профиль
          </Link>
          <Link to="/dashboard" className="user-dd-item" onClick={() => setOpen(false)} role="menuitem">
            <span className="ico">📊</span> Личный кабинет
          </Link>
          <Link to="/profile?tab=favorites" className="user-dd-item" onClick={() => setOpen(false)} role="menuitem">
            <span className="ico">★</span> Избранное
          </Link>
          <hr className="user-dd-sep" />
          <button className="user-dd-item logout" onClick={handleLogout} role="menuitem">
            <span className="ico">⎋</span> Выйти
          </button>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;

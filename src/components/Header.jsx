import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import UserDropdown from './auth/UserDropdown';
import '../styles/Header.css';
import '../styles/Auth.css';

const NAV = [
  { to: '/about', label: 'О компании' },
  { to: '/treatment', label: 'Лечение' },
  { to: '/beauty', label: 'Красота' },
  { to: '/checkup', label: 'Check Up' },
  { to: '/eastern', label: 'Восточная медицина' },
  { to: '/future', label: 'Медицина будущего' },
  { to: '/promotions', label: 'Акции', cls: 'nav-akcii' },
  { to: '/contacts', label: 'Контакты' },
];

const NAV_GAP = 2;

const Header = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visibleCount, setVisibleCount] = useState(NAV.length);
  const [moreOpen, setMoreOpen] = useState(false);

  const navRef = useRef(null);
  const measureRef = useRef(null);
  const moreRef = useRef(null);
  const widthsRef = useRef({ items: [], more: 0 });

  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  const recompute = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const available = nav.clientWidth;
    const { items, more } = widthsRef.current;
    if (!items.length || available <= 0) return;

    const sumN = (n) =>
      n === 0 ? 0 : items.slice(0, n).reduce((s, w) => s + w, 0) + NAV_GAP * (n - 1);

    if (sumN(items.length) <= available) {
      setVisibleCount(items.length);
      return;
    }
    let count = 0;
    for (let n = 1; n <= items.length; n++) {
      if (sumN(n) + more + NAV_GAP <= available) count = n;
      else break;
    }
    setVisibleCount(count);
  }, []);

  useEffect(() => {
    setDrawerOpen(false);
    setMoreOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!moreOpen) return;
    const onDown = (e) => {
      if (moreRef.current && !moreRef.current.contains(e.target)) setMoreOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setMoreOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [moreOpen]);

  useLayoutEffect(() => {
    const measure = () => {
      const m = measureRef.current;
      if (!m) return;
      const itemEls = m.querySelectorAll('.measure-item');
      widthsRef.current.items = Array.from(itemEls).map(
        (el) => el.getBoundingClientRect().width
      );
      const moreEl = m.querySelector('.measure-more');
      widthsRef.current.more = moreEl ? moreEl.getBoundingClientRect().width : 64;
      recompute();
    };
    measure();
    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure).catch(() => {});
    }
  }, [recompute]);

  useEffect(() => {
    if (!navRef.current) return;
    const ro = new ResizeObserver(() => recompute());
    ro.observe(navRef.current);
    const headerTop = navRef.current.closest('.header-top');
    if (headerTop) ro.observe(headerTop);
    return () => ro.disconnect();
  }, [recompute]);

  useLayoutEffect(() => {
    recompute();
  }, [isAuthenticated, recompute]);

  const overflowItems = NAV.slice(visibleCount);
  const overflowHasActive = overflowItems.some((n) => isActive(n.to));

  return (
    <>
      <div className="header-spacer" aria-hidden="true" />
      <header className={`main-header ${scrolled ? 'is-scrolled' : ''}`}>
        <div className="header-top">
          <Link to="/" className="logo-wrap" aria-label="SmartMed Service — на главную">
            <span className="logo-mark" aria-hidden="true">
              <svg viewBox="0 0 32 32" width="22" height="22">
                <defs>
                  <linearGradient id="lg" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="100%" stopColor="#dff1ff" />
                  </linearGradient>
                </defs>
                <path
                  d="M16 3.5 3.5 9v8.5C3.5 23.4 9 27.6 16 29c7-1.4 12.5-5.6 12.5-11.5V9L16 3.5Z"
                  fill="url(#lg)" opacity=".95"
                />
                <path
                  d="M14 11h4v4h4v4h-4v4h-4v-4h-4v-4h4v-4Z"
                  fill="#0a84ff"
                />
              </svg>
            </span>
            <div className="logo-text">
              <strong>SmartMed</strong>
              <span>Service · Premium care</span>
            </div>
          </Link>

          <nav className="top-nav" aria-label="Главное меню" ref={navRef}>
            {NAV.slice(0, visibleCount).map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className={`${n.cls || ''} ${isActive(n.to) ? 'active' : ''}`.trim()}
              >
                {n.label}
              </Link>
            ))}

            {overflowItems.length > 0 && (
              <div
                className={`nav-more ${moreOpen ? 'open' : ''}`}
                ref={moreRef}
              >
                <button
                  type="button"
                  className={`nav-more-btn ${moreOpen ? 'open' : ''} ${overflowHasActive ? 'has-active' : ''}`.trim()}
                  onClick={() => setMoreOpen((o) => !o)}
                  aria-haspopup="menu"
                  aria-expanded={moreOpen}
                >
                  Ещё
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                {moreOpen && (
                  <div className="nav-more-panel" role="menu">
                    {overflowItems.map((n) => (
                      <Link
                        key={n.to}
                        to={n.to}
                        role="menuitem"
                        className={`nav-more-item ${isActive(n.to) ? 'active' : ''} ${n.cls === 'nav-akcii' ? 'is-akcii' : ''}`.trim()}
                        onClick={() => setMoreOpen(false)}
                      >
                        {n.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}

            <div className="nav-measure" ref={measureRef} aria-hidden="true">
              {NAV.map((n) => (
                <span key={n.to} className={`measure-item ${n.cls || ''}`.trim()}>
                  {n.label}
                </span>
              ))}
              <span className="measure-more">
                Ещё
                <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="m6 9 6 6 6-6" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
          </nav>

          <div className="header-auth">
            <a href="tel:+74951234567" className="header-phone" aria-label="Позвонить">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.72 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.35 1.85.59 2.81.72A2 2 0 0 1 22 16.92Z"/></svg>
              <span>+7 495 123-45-67</span>
            </a>
            {isAuthenticated ? (
              <UserDropdown />
            ) : (
              <>
                <Link to="/login" className="login-link">Войти</Link>
                <Link to="/signup" className="btn-cta">
                  Запись на приём
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
                </Link>
              </>
            )}
          </div>

          <button
            className={`hamburger ${drawerOpen ? 'open' : ''}`}
            onClick={() => setDrawerOpen((o) => !o)}
            aria-label="Меню"
            aria-expanded={drawerOpen}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div
        className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}
        onClick={(e) => { if (e.target === e.currentTarget) setDrawerOpen(false); }}
      >
        <aside className="mobile-drawer-panel">
          <div className="mobile-drawer-head">
            <span style={{ fontWeight: 800, color: 'var(--primary)' }}>Меню</span>
            <button
              className="mobile-drawer-close"
              onClick={() => setDrawerOpen(false)}
              aria-label="Закрыть"
            >×</button>
          </div>
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className={`mobile-nav-link ${isActive(n.to) ? 'active' : ''}`}
            >
              {n.label}
            </Link>
          ))}

          <div className="mobile-drawer-auth">
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="auth-btn auth-btn-ghost">Мой профиль</Link>
                <Link to="/dashboard" className="auth-btn">Личный кабинет</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="auth-btn auth-btn-ghost">Войти</Link>
                <Link to="/signup" className="auth-btn">Запись на приём</Link>
              </>
            )}
          </div>
        </aside>
      </div>
    </>
  );
};

export default Header;

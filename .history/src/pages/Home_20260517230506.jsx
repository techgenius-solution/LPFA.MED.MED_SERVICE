import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/Home.css';

/* ------------------------------------------------------------------ */
/*  Iconography                                                       */
/* ------------------------------------------------------------------ */
const Icon = {
  building: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 21V7l8-4 8 4v14"/><path d="M9 21V12h6v9"/><path d="M3 21h18"/></svg>
  ),
  stethoscope: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 3v6a4 4 0 0 0 8 0V3"/><path d="M10 14v3a4 4 0 0 0 8 0v-2"/><circle cx="18" cy="11" r="2"/></svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4"/><path d="M12 17v4"/><path d="M3 12h4"/><path d="M17 12h4"/><path d="m6 6 2.5 2.5"/><path d="m15.5 15.5 2.5 2.5"/><path d="m6 18 2.5-2.5"/><path d="m15.5 8.5 2.5-2.5"/></svg>
  ),
  heartPulse: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0L12 5.34l-.77-.76a5.4 5.4 0 0 0-7.65 7.64l1.05 1.05L12 20l7.37-6.73 1.05-1.05a5.4 5.4 0 0 0 0-7.64Z"/><path d="M3.5 12h4l1.5-3 3 6 1.5-3h7"/></svg>
  ),
  leaf: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M11 20A7 7 0 0 1 4 13c0-6 4-9 13-9 0 9-3 16-6 16Z"/><path d="M4 13c0 5 3 7 7 7"/></svg>
  ),
  cpu: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="4" width="16" height="16" rx="3"/><rect x="9" y="9" width="6" height="6"/><path d="M9 1v3"/><path d="M15 1v3"/><path d="M9 20v3"/><path d="M15 20v3"/><path d="M1 9h3"/><path d="M1 15h3"/><path d="M20 9h3"/><path d="M20 15h3"/></svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
  ),
  award: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="9" r="6"/><path d="m8.5 14-1 7L12 18l4.5 3-1-7"/></svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z"/></svg>
  ),
  clock: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.9L12 17.8 5.8 21l1.2-6.9-5-4.9 6.9-1Z"/></svg>
  ),
  arrow: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></svg>
  ),
  chev: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  ),
};

/* ------------------------------------------------------------------ */
/*  Hooks                                                             */
/* ------------------------------------------------------------------ */
const useInView = (options = { threshold: 0.15 }) => {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        obs.unobserve(el);
      }
    }, options);
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
};

const Counter = ({ to, suffix = '', duration = 1500, decimals = 0 }) => {
  const [ref, inView] = useInView({ threshold: 0.4 });
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(to * eased);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, to, duration]);
  return (
    <span ref={ref}>
      {decimals ? val.toFixed(decimals) : Math.round(val)}
      {suffix}
    </span>
  );
};

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */
const SERVICES = [
  {
    to: '/about',
    icon: Icon.building,
    title: 'О компании',
    desc: 'Премиальный медицинский холдинг с 25-летней практикой и интеграцией международных стандартов JCI.',
    tag: '25+ лет на рынке',
    stat: '12k+',
    statLabel: 'пациентов в год',
    accent: 'a',
  },
  {
    to: '/treatment',
    icon: Icon.stethoscope,
    title: 'Лечение',
    desc: '40+ направлений: кардиология, онкология, ортопедия, нейрохирургия с использованием доказательной медицины.',
    tag: 'Доказательная медицина',
    stat: '98%',
    statLabel: 'успешных кейсов',
    accent: 'b',
  },
  {
    to: '/beauty',
    icon: Icon.sparkle,
    title: 'Красота',
    desc: 'Эстетическая косметология, инъекционные методики, лазерные технологии и SPA-ритуалы премиум-класса.',
    tag: 'Anti-age лаборатория',
    stat: '150+',
    statLabel: 'процедур',
    accent: 'c',
  },
  {
    to: '/checkup',
    icon: Icon.heartPulse,
    title: 'Check Up',
    desc: 'Комплексная диагностика за 4 часа: МРТ, КТ, генетика, биомаркеры — полная карта здоровья в одном визите.',
    tag: 'Экспресс 4 часа',
    stat: '120+',
    statLabel: 'показателей',
    accent: 'd',
  },
  {
    to: '/eastern',
    icon: Icon.leaf,
    title: 'Восточная медицина',
    desc: 'Иглорефлексотерапия, аюрведа, фитотерапия — холистический подход, проверенный тысячелетиями.',
    tag: 'TCM сертификат',
    stat: '7',
    statLabel: 'школ практик',
    accent: 'e',
  },
  {
    to: '/future',
    icon: Icon.cpu,
    title: 'Медицина будущего',
    desc: 'AI-диагностика, цифровые двойники органов, геномные панели и непрерывный мониторинг здоровья 24/7.',
    tag: 'AI Diagnostics',
    stat: '24/7',
    statLabel: 'мониторинг',
    accent: 'f',
  },
];

const FUTURE_FEATURES = [
  { icon: Icon.cpu,        title: 'AI-диагностика',       desc: 'Нейросети анализируют МРТ, КТ и гистологию точностью 99,2%.' },
  { icon: Icon.bolt,       title: 'Smart-мониторинг',     desc: 'Носимые устройства передают данные в защищённый облачный профиль.' },
  { icon: Icon.heartPulse, title: 'Цифровой двойник',     desc: 'Персональная модель организма для прогноза рисков и лечения.' },
  { icon: Icon.shield,     title: 'Защищённые данные',    desc: 'Шифрование медицинских записей по стандартам HIPAA & ФЗ-152.' },
];

const BEAUTY = [
  { tag: 'Anti-age',    title: 'Plasma Lift PRO',       price: 'от 18 900 ₽', dur: '60 мин', hue: 'rose' },
  { tag: 'Лазер',       title: 'Laser Skin Resurface',  price: 'от 24 500 ₽', dur: '45 мин', hue: 'violet' },
  { tag: 'Контуринг',   title: 'HArmonic Contouring',   price: 'от 32 000 ₽', dur: '50 мин', hue: 'cyan' },
  { tag: 'SPA',         title: 'Diamond Glow Ritual',   price: 'от 14 200 ₽', dur: '90 мин', hue: 'mint' },
];

const CHECKUP_PACKS = [
  {
    name: 'Essential',
    price: '29 900',
    desc: 'Базовая карта здоровья для активных взрослых.',
    bullets: ['ОАК, биохимия, гормоны', 'ЭКГ + УЗИ сердца', 'Консультация терапевта', 'Отчёт в личном кабинете'],
    badge: null,
  },
  {
    name: 'Premium 360',
    price: '74 500',
    desc: 'Полная диагностика с расширенной онкопанелью и МРТ.',
    bullets: ['МРТ 3.0T + КТ грудной клетки', 'Онкомаркеры (12 показателей)', 'Кардио-стресс тест', 'AI-прогноз рисков на 10 лет', 'Персональный план профилактики'],
    badge: 'Популярный',
  },
  {
    name: 'Genome Elite',
    price: '189 000',
    desc: 'Геномное секвенирование + пожизненное сопровождение.',
    bullets: ['Полное секвенирование (WGS)', 'Фарма-генетический паспорт', 'Цифровой двойник органов', 'VIP куратор 24/7', 'Расширенная диагностика 200+'],
    badge: 'VIP',
  },
];

const EASTERN = [
  { icon: '🪷', title: 'Иглорефлексотерапия', desc: 'Восстановление энергобаланса через 365 биоактивных точек.' },
  { icon: '🍃', title: 'Фитотерапия',         desc: 'Авторские травяные сборы по принципам TCM и аюрведы.' },
  { icon: '🌀', title: 'Цигун & медитация',    desc: 'Дыхательные практики для нервной системы и иммунитета.' },
  { icon: '🔥', title: 'Моксотерапия',         desc: 'Прогревание полынными конусами для глубокой регенерации.' },
];

const DOCTORS = [
  { name: 'Анна Воронцова, MD',  spec: 'Кардиолог · к.м.н.', years: 18, rating: 4.97, photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&q=80' },
  { name: 'Дмитрий Соколов, MD', spec: 'Нейрохирург',         years: 22, rating: 4.99, photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&q=80' },
  { name: 'Чжан Вэй, TCM',       spec: 'Восточная медицина',  years: 15, rating: 4.94, photo: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&q=80' },
  { name: 'Елена Лернер',        spec: 'Дерматолог-косметолог',years: 12, rating: 4.96, photo: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&q=80' },
];

const TESTIMONIALS = [
  {
    name: 'Мария К.',
    role: 'Программа Premium 360',
    text: 'Получила полную карту здоровья за один день. Удобный личный кабинет, врач объяснил каждый показатель — впервые понимаю, что происходит с моим организмом.',
    rating: 5,
  },
  {
    name: 'Алексей М.',
    role: 'Кардиология',
    text: 'AI-анализ ЭКГ обнаружил ранние признаки аритмии, которые пропустили в двух других клиниках. Уровень оборудования и сервиса — европейский.',
    rating: 5,
  },
  {
    name: 'Дарья В.',
    role: 'Anti-age лаборатория',
    text: 'Прошла курс Plasma Lift и SPA. Естественный результат, никакой «маски». Куратор поддерживает между визитами — это бесценно.',
    rating: 5,
  },
];

const FAQ = [
  { q: 'Нужно ли направление для записи на Check Up?', a: 'Нет, программа подбирается терапевтом клиники во время короткой бесплатной консультации. Достаточно оставить заявку онлайн.' },
  { q: 'Как работает AI-диагностика и насколько она надёжна?', a: 'Мы используем сертифицированные европейские модели, обученные на 4+ млн случаев. AI выступает вторым мнением, окончательный диагноз ставит врач.' },
  { q: 'Можно ли наблюдаться удалённо после визита?',          a: 'Да. Личный кабинет хранит все исследования, а лечащий врач доступен в защищённом чате 24/7 в течение всей программы сопровождения.' },
  { q: 'Сколько времени занимает экспресс check-up?',          a: 'Программа Essential — около 3 часов, Premium 360 — 4–5 часов с обедом в lounge-зоне. Все результаты вы получаете в тот же день.' },
];

const PARTNERS = ['JCI', 'ISO 9001', 'Mayo Clinic', 'Charité', 'HIPAA', 'EFSUMB'];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */
const Home = () => {
  const [faqOpen, setFaqOpen] = useState(0);

  return (
    <div className="hp-root">
      <Header />

      {/* ============================ HERO ============================ */}
      <section className="hp-hero">
        <div className="hp-hero-bg" aria-hidden="true">
          <div className="orb orb-1" />
          <div className="orb orb-2" />
          <div className="orb orb-3" />
          <div className="grid-overlay" />
        </div>

        <div className="container hp-hero-inner">
          <div className="hp-hero-text reveal">
            <span className="eyebrow"><span className="dot" /> Smart Medicine · Premium care</span>
            <h1>
              Медицина <span className="grad-text">нового поколения</span><br />
              для тех, кто ценит точность
            </h1>
            <p className="hp-hero-lead">
              SmartMed Service объединяет AI-диагностику, восточные практики, эстетическую медицину
              и круглосуточный мониторинг в одной премиальной экосистеме здоровья.
            </p>

            <div className="hp-hero-cta">
              <Link to="/signup" className="primary-btn">
                Записаться на приём {Icon.arrow}
              </Link>
              <Link to="/about" className="btn-ghost">Узнать больше</Link>
            </div>

            <div className="hp-hero-trust">
              <div className="trust-item">
                <strong><Counter to={25} suffix="+" /></strong>
                <span>лет экспертизы</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <strong><Counter to={12} />k+</strong>
                <span>пациентов в год</span>
              </div>
              <div className="trust-divider" />
              <div className="trust-item">
                <strong><Counter to={98} suffix="%" /></strong>
                <span>NPS-удовлетворённость</span>
              </div>
            </div>
          </div>

          <div className="hp-hero-art reveal d-2" aria-hidden="true">
            <div className="art-photo">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=900&h=1100&fit=crop&q=80"
                alt=""
              />
              <div className="art-gradient" />
            </div>

            <div className="art-card art-card-vitals">
              <div className="art-card-head">
                <span className="art-dot live" /> Live vitals
                <span className="art-id">#A-2104</span>
              </div>
              <div className="art-vital">
                <span className="vital-label">Heart rate</span>
                <span className="vital-value">72 <em>bpm</em></span>
              </div>
              <svg className="art-ecg" viewBox="0 0 200 50" preserveAspectRatio="none">
                <polyline
                  fill="none" stroke="currentColor" strokeWidth="1.6"
                  points="0,25 20,25 30,25 40,10 50,40 60,25 80,25 100,25 110,5 120,45 130,25 160,25 200,25"
                />
              </svg>
              <div className="art-vital-row">
                <div><span className="vital-label">SpO₂</span><strong>99%</strong></div>
                <div><span className="vital-label">BP</span><strong>118/76</strong></div>
                <div><span className="vital-label">Temp</span><strong>36.6°</strong></div>
              </div>
            </div>

            <div className="art-card art-card-ai">
              <div className="art-ai-head">
                <span className="art-ai-icon">{Icon.cpu}</span>
                <div>
                  <strong>AI Diagnostics</strong>
                  <span>Анализ МРТ · 12 сек</span>
                </div>
              </div>
              <div className="art-ai-bar">
                <div className="bar-track"><div className="bar-fill" style={{ width: '94%' }} /></div>
                <span>94% совпадение с эталоном</span>
              </div>
            </div>

            <div className="art-card art-card-badge">
              {Icon.shield}
              <div>
                <strong>JCI Accredited</strong>
                <span>Международный стандарт качества</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hp-partners">
          <div className="container">
            <span className="hp-partners-label">Сертификации и партнёры</span>
            <div className="hp-partners-row">
              {PARTNERS.map((p) => <span key={p} className="hp-partner-chip">{p}</span>)}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== SERVICES GRID ====================== */}
      <section className="hp-section">
        <div className="container">
          <div className="hp-section-head">
            <div>
              <span className="eyebrow"><span className="dot" /> Направления</span>
              <h2>Единая экосистема <span className="grad-text">здоровья</span></h2>
            </div>
            <p className="hp-section-sub">
              Шесть направлений, объединённых одной картой пациента и круглосуточным куратором.
            </p>
          </div>

          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <Link to={s.to} key={s.title} className={`svc-card svc-${s.accent} reveal d-${(i % 6) + 1}`}>
                <div className="svc-card-top">
                  <div className="svc-icon">{s.icon}</div>
                  <span className="svc-tag">{s.tag}</span>
                </div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="svc-card-foot">
                  <div className="svc-stat">
                    <strong>{s.stat}</strong>
                    <span>{s.statLabel}</span>
                  </div>
                  <span className="svc-cta">
                    Подробнее {Icon.arrow}
                  </span>
                </div>
                <div className="svc-glow" aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== FUTURE MEDICINE ====================== */}
      <section className="hp-section hp-future">
        <div className="container">
          <div className="hp-future-grid">
            <div className="hp-future-text">
              <span className="eyebrow"><span className="dot" /> Медицина будущего</span>
              <h2>Цифровое здоровье<br /><span className="grad-text">под управлением AI</span></h2>
              <p>
                Платформа SmartMed собирает данные с лабораторий, носимых устройств и врачей в единый
                цифровой профиль, а нейросеть выявляет риски за годы до клинических проявлений.
              </p>

              <ul className="future-list">
                {FUTURE_FEATURES.map((f) => (
                  <li key={f.title}>
                    <span className="future-ico">{f.icon}</span>
                    <div>
                      <strong>{f.title}</strong>
                      <span>{f.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <Link to="/future" className="primary-btn">
                Открыть AI-платформу {Icon.arrow}
              </Link>
            </div>

            <div className="hp-future-dash reveal d-2" aria-hidden="true">
              <div className="dash-window">
                <div className="dash-head">
                  <span className="dash-dot r" /><span className="dash-dot y" /><span className="dash-dot g" />
                  <span className="dash-title">SmartMed · Health OS</span>
                </div>
                <div className="dash-body">
                  <div className="dash-kpi">
                    <div className="kpi-card">
                      <span>Heart Index</span>
                      <strong>92<em>/100</em></strong>
                      <div className="kpi-trend up">▲ +4</div>
                    </div>
                    <div className="kpi-card">
                      <span>Sleep</span>
                      <strong>7.4<em>h</em></strong>
                      <div className="kpi-trend up">▲ +12%</div>
                    </div>
                    <div className="kpi-card">
                      <span>Stress</span>
                      <strong>Low</strong>
                      <div className="kpi-trend down">▼ -8%</div>
                    </div>
                  </div>

                  <div className="dash-chart">
                    <div className="chart-head">
                      <strong>Биомаркеры · 30 дней</strong>
                      <span className="chart-leg"><i className="dot1" />HRV<i className="dot2" />Glucose</span>
                    </div>
                    <svg viewBox="0 0 300 100" preserveAspectRatio="none" className="chart-svg">
                      <defs>
                        <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                          <stop offset="0%" stopColor="#0a84ff" stopOpacity=".35" />
                          <stop offset="100%" stopColor="#0a84ff" stopOpacity="0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,70 C30,60 50,40 80,45 C110,50 130,30 160,35 C190,40 210,20 240,28 C270,36 285,30 300,25 L300,100 L0,100 Z" fill="url(#g1)" />
                      <polyline fill="none" stroke="#0a84ff" strokeWidth="2"
                        points="0,70 30,60 50,40 80,45 110,50 130,30 160,35 190,40 210,20 240,28 270,36 285,30 300,25" />
                      <polyline fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="4 3"
                        points="0,80 30,75 60,70 90,65 120,72 150,60 180,55 210,58 240,50 270,55 300,48" />
                    </svg>
                  </div>

                  <div className="dash-alerts">
                    <div className="dash-alert ok">{Icon.check} <span>Скрининг: норма</span></div>
                    <div className="dash-alert info">{Icon.bolt} <span>AI: повысить активность на 12%</span></div>
                  </div>
                </div>
              </div>
              <div className="dash-floater f1">{Icon.heartPulse}</div>
              <div className="dash-floater f2">{Icon.cpu}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================== BEAUTY & WELLNESS ====================== */}
      <section className="hp-section hp-beauty">
        <div className="container">
          <div className="hp-section-head">
            <div>
              <span className="eyebrow"><span className="dot" /> Красота & Wellness</span>
              <h2>Эстетика, <span className="grad-text">основанная на науке</span></h2>
            </div>
            <Link to="/beauty" className="link-btn">Все процедуры {Icon.arrow}</Link>
          </div>

          <div className="beauty-grid">
            <div className="beauty-feature">
              <div className="beauty-feature-img">
                <img src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=900&h=900&fit=crop&q=80" alt="" />
                <div className="ba-toggle"><span className="active">До</span><span>После</span></div>
                <div className="ba-stat">−7 лет визуального возраста</div>
              </div>
              <div className="beauty-feature-text">
                <h3>Anti-age лаборатория SmartGlow</h3>
                <p>Авторский протокол из 8 шагов: диагностика кожи AI-сканером, плазмолифтинг,
                лазерная шлифовка, биоревитализация и финальный SPA-ритуал.</p>
                <ul className="beauty-bullets">
                  <li>{Icon.check} Естественный результат без эффекта «маски»</li>
                  <li>{Icon.check} Поддержка куратора между визитами</li>
                  <li>{Icon.check} Косметика клиники в подарок</li>
                </ul>
                <Link to="/beauty" className="btn-ghost">Бесплатная консультация</Link>
              </div>
            </div>

            <div className="beauty-cards">
              {BEAUTY.map((b) => (
                <div key={b.title} className={`beauty-card hue-${b.hue}`}>
                  <span className="beauty-tag">{b.tag}</span>
                  <h4>{b.title}</h4>
                  <div className="beauty-meta">
                    <span>{Icon.clock} {b.dur}</span>
                    <strong>{b.price}</strong>
                  </div>
                  <button className="beauty-book">Записаться {Icon.arrow}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== CHECK UP ====================== */}
      <section className="hp-section hp-checkup">
        <div className="container">
          <div className="hp-section-head center">
            <span className="eyebrow"><span className="dot" /> Check Up программы</span>
            <h2>Полная карта здоровья <span className="grad-text">за один день</span></h2>
            <p className="hp-section-sub">
              Три уровня глубины диагностики — от базового скрининга до геномного паспорта.
            </p>
          </div>

          <div className="checkup-pricing">
            {CHECKUP_PACKS.map((p, i) => (
              <div key={p.name} className={`pricing-card ${i === 1 ? 'featured' : ''}`}>
                {p.badge && <span className="pricing-badge">{p.badge}</span>}
                <h3>{p.name}</h3>
                <p className="pricing-desc">{p.desc}</p>
                <div className="pricing-price">
                  <strong>{p.price}</strong>
                  <span>₽ / программа</span>
                </div>
                <ul className="pricing-list">
                  {p.bullets.map((b) => (
                    <li key={b}><span className="pricing-check">{Icon.check}</span>{b}</li>
                  ))}
                </ul>
                <button className={i === 1 ? 'primary-btn' : 'btn-ghost'} style={{ width: '100%', justifyContent: 'center' }}>
                  Выбрать пакет {Icon.arrow}
                </button>
              </div>
            ))}
          </div>

          <div className="checkup-timeline">
            <h3>Как проходит диагностика</h3>
            <div className="timeline-row">
              {[
                { n: '01', t: 'Онлайн-заявка', d: 'Подбор программы и куратора за 5 минут.' },
                { n: '02', t: 'Прибытие в lounge', d: 'Welcome-кофе, бейдж и персональный маршрут.' },
                { n: '03', t: 'Диагностика 4 часа', d: 'МРТ, КТ, лаборатория, консультации экспертов.' },
                { n: '04', t: 'AI-отчёт', d: 'Полная карта здоровья и план в личном кабинете.' },
              ].map((s) => (
                <div className="timeline-step" key={s.n}>
                  <span className="timeline-n">{s.n}</span>
                  <strong>{s.t}</strong>
                  <span>{s.d}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================== EASTERN MEDICINE ====================== */}
      <section className="hp-section hp-eastern">
        <div className="hp-eastern-bg" aria-hidden="true" />
        <div className="container hp-eastern-grid">
          <div className="hp-eastern-text">
            <span className="eyebrow"><span className="dot" /> Восточная медицина</span>
            <h2>Древние практики, <span className="grad-text">современная безопасность</span></h2>
            <p>
              Сертифицированные мастера TCM и аюрведы работают рука об руку с врачами доказательной
              медицины. Мы используем 5000-летний опыт там, где он действительно помогает —
              без отказа от современных протоколов.
            </p>
            <div className="zen-stats">
              <div><strong>15+</strong><span>мастеров TCM</span></div>
              <div><strong>32</strong><span>протокола</span></div>
              <div><strong>97%</strong><span>возвращаются</span></div>
            </div>
            <Link to="/eastern" className="btn-ghost">Все программы {Icon.arrow}</Link>
          </div>

          <div className="zen-cards">
            {EASTERN.map((e) => (
              <div className="zen-card" key={e.title}>
                <span className="zen-icon">{e.icon}</span>
                <strong>{e.title}</strong>
                <span>{e.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== DOCTORS ====================== */}
      <section className="hp-section">
        <div className="container">
          <div className="hp-section-head">
            <div>
              <span className="eyebrow"><span className="dot" /> Команда</span>
              <h2>Врачи, <span className="grad-text">которым доверяют</span></h2>
            </div>
            <Link to="/about" className="link-btn">Все специалисты {Icon.arrow}</Link>
          </div>

          <div className="doctors-grid">
            {DOCTORS.map((d) => (
              <div className="doctor-card" key={d.name}>
                <div className="doctor-photo">
                  <img src={d.photo} alt={d.name} loading="lazy" />
                  <span className="doctor-badge">{Icon.shield} Verified</span>
                </div>
                <div className="doctor-info">
                  <strong>{d.name}</strong>
                  <span className="doctor-spec">{d.spec}</span>
                  <div className="doctor-meta">
                    <span>{Icon.award} {d.years} лет</span>
                    <span className="doctor-rate">{Icon.star} {d.rating}</span>
                  </div>
                  <button className="doctor-book">Записаться</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== STATS BAND ====================== */}
      <section className="hp-stats-band">
        <div className="container hp-stats-grid">
          <div className="stat-cell">
            <strong><Counter to={25} suffix="+" /></strong>
            <span>лет на рынке</span>
          </div>
          <div className="stat-cell">
            <strong><Counter to={120000} /></strong>
            <span>довольных пациентов</span>
          </div>
          <div className="stat-cell">
            <strong><Counter to={98} suffix="%" /></strong>
            <span>удовлетворённость</span>
          </div>
          <div className="stat-cell">
            <strong>24/7</strong>
            <span>поддержка куратора</span>
          </div>
          <div className="stat-cell">
            <strong><Counter to={180} suffix="+" /></strong>
            <span>сертифицированных врачей</span>
          </div>
        </div>
      </section>

      {/* ====================== TESTIMONIALS ====================== */}
      <section className="hp-section">
        <div className="container">
          <div className="hp-section-head center">
            <span className="eyebrow"><span className="dot" /> Отзывы пациентов</span>
            <h2>Реальные истории, <span className="grad-text">а не маркетинг</span></h2>
          </div>

          <div className="testi-grid">
            {TESTIMONIALS.map((t) => (
              <div className="testi-card" key={t.name}>
                <div className="testi-rate">
                  {Array.from({ length: t.rating }).map((_, i) => <span key={i}>{Icon.star}</span>)}
                </div>
                <p>«{t.text}»</p>
                <div className="testi-foot">
                  <div className="testi-avatar">{t.name.charAt(0)}</div>
                  <div>
                    <strong>{t.name}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================== BOOKING + FAQ ====================== */}
      <section className="hp-section hp-booking-section">
        <div className="container hp-booking-grid">
          <div className="booking-card">
            <span className="eyebrow"><span className="dot" /> Запись на приём</span>
            <h2>Оставьте заявку — <span className="grad-text">мы перезвоним за 7 минут</span></h2>
            <p className="booking-sub">Куратор поможет подобрать программу и удобное время визита.</p>

            <form className="booking-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-row">
                <label>
                  <span>Имя</span>
                  <input type="text" placeholder="Как к вам обращаться" />
                </label>
                <label>
                  <span>Телефон</span>
                  <input type="tel" placeholder="+7 (___) ___-__-__" />
                </label>
              </div>
              <label>
                <span>Направление</span>
                <select defaultValue="">
                  <option value="" disabled>Выберите услугу</option>
                  <option>Check Up · Premium 360</option>
                  <option>Лечение и консультация специалиста</option>
                  <option>Эстетическая медицина</option>
                  <option>Восточная медицина</option>
                  <option>AI-диагностика</option>
                </select>
              </label>
              <label>
                <span>Удобное время</span>
                <input type="datetime-local" />
              </label>
              <label className="form-check">
                <input type="checkbox" defaultChecked />
                <span>Согласен на обработку персональных данных по ФЗ-152</span>
              </label>
              {/* <button type="submit" className="primary-btn" style={{ width: '100%', justifyContent: 'center' }}>
                Отправить заявку {Icon.arrow}
              </button> */}
            </form>

            <div className="booking-trust">
              <span>{Icon.shield} Защищённый канал · ваши данные не передаются третьим лицам</span>
            </div>
          </div>

          <div className="faq-card">
            <span className="eyebrow"><span className="dot" /> FAQ</span>
            <h2>Частые вопросы</h2>

            <div className="faq-list">
              {FAQ.map((f, i) => (
                <details key={f.q} open={faqOpen === i} onClick={(e) => { e.preventDefault(); setFaqOpen(faqOpen === i ? -1 : i); }}>
                  <summary>
                    <span>{f.q}</span>
                    <span className="faq-chev">{Icon.chev}</span>
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

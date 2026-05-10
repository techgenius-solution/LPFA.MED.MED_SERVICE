import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { clinics } from '../data/clinics';
import '../styles/Form.css';

const TABS = [
  { id: 'general', label: 'Общий запрос' },
  { id: 'treatment', label: 'Лечение' },
  { id: 'beauty', label: 'Красота' },
  { id: 'checkup', label: 'Check Up' },
  { id: 'infertility', label: 'Бесплодие' },
  { id: 'neurology', label: 'Неврология' },
];

const FormSidebar = () => (
  <div className="form-sidebar">
    <div className="form-tips">
      <h4>Советы по заполнению</h4>
      <p>Клиника очень фешенебельная и мед персонал профессиональный и внимательный. Роза и Асель.</p>
      <p>Проделали огромную работу до приезда, отвечали быстро и чётко на все мои вопросы, а Айгерим постоянно была рядом на протяжении всего пребывания.</p>
      <p>Проделали огромную работу до приезда, отвечали быстро и чётко на все мои вопросы, а Айгерим постоянно была рядом на протяжении всего пребывания.</p>
    </div>
    <div className="form-contacts">
      <h4>Контакты</h4>
      <p>Тел.:&nbsp; +7 (701) 081-6040</p>
      <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;+7 (727) 081-6040</p>
      <p>Email: <a href="mailto:info@smartmedservice.com">info@smartmedservice.com</a></p>
    </div>
  </div>
);

const GeneralForm = () => (
  <div className="form-main">
    <div className="form-row">
      <div className="form-group">
        <label>Ваше имя</label>
        <input type="text" placeholder="" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" placeholder="" />
      </div>
    </div>
    <div className="form-group">
      <label>Телефон</label>
      <input type="tel" placeholder="" />
    </div>
    <div className="form-group">
      <label>Сообщение</label>
      <textarea placeholder="Клиника очень фешенебельная и мед персонал профессиональный и внимательный. Роза и Асель, проделали огромную работу до приезда, отвечали быстро и чётко на все мои вопросы. А Айгерим постоянно была рядом на протяжении всего пребывания"></textarea>
    </div>
    <div className="form-checkbox">
      <input type="checkbox" defaultChecked />
      <span>Согласен с <a href="/terms">условиями и правилами</a> сайта</span>
    </div>
    <button className="form-submit-btn">Отправить запрос &gt;</button>
  </div>
);

const TreatmentForm = () => (
  <div className="form-main">
    <div className="form-row">
      <div className="form-group">
        <label>ФИО пациента</label>
        <input type="text" defaultValue="Виктория" className="highlighted" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Гражданство</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Дата рождения</label>
        <div className="date-row">
          <input type="text" placeholder="день" />
          <input type="text" placeholder="месяц" />
          <input type="text" placeholder="год" />
        </div>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Пол</label>
        <div className="radio-group">
          <label className="radio-option">
            <input type="radio" name="gender" defaultChecked /> Женский
          </label>
          <label className="radio-option">
            <input type="radio" name="gender" /> Мужской
          </label>
        </div>
      </div>
      <div className="form-group">
        <label>Телефон</label>
        <input type="tel" />
      </div>
    </div>
    <div className="form-group">
      <label>Данные по заболеванию</label>
      <textarea placeholder="Анализ показал..." />
    </div>
    <div className="form-group">
      <label>Наличие хронических заболеваний: Наличие следующих заболеваний высокое давление, сахарный диабет бронхиальная астма вирусных гепатита аллергия контрацептивы гастрофлюс</label>
      <textarea placeholder="" style={{ minHeight: '70px' }} />
    </div>
    <div className="form-group">
      <label>История болезни</label>
      <textarea placeholder="Анализ показал..." />
    </div>
    <button className="form-submit-btn">Отправить запрос &gt;</button>
  </div>
);

const BeautyForm = () => (
  <div className="form-main">
    <div className="form-row">
      <div className="form-group">
        <label>ФИО пациента</label>
        <input type="text" defaultValue="Виктория" className="highlighted" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Гражданство</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Дата рождения</label>
        <div className="date-row">
          <input type="text" placeholder="день" />
          <input type="text" placeholder="месяц" />
          <input type="text" placeholder="год" />
        </div>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Пол</label>
        <div className="radio-group">
          <label className="radio-option"><input type="radio" name="gender-b" defaultChecked /> Женский</label>
          <label className="radio-option"><input type="radio" name="gender-b" /> Мужской</label>
        </div>
      </div>
      <div className="form-group">
        <label>Телефон</label>
        <input type="tel" />
      </div>
    </div>
    <div className="form-group">
      <label>Желаемый вид процедуры/операции</label>
      <textarea placeholder="Анализ показал..." style={{ minHeight: '80px' }} />
    </div>
    <div className="form-group">
      <label>Желаемая дата консультации/процедуры</label>
      <input type="text" />
    </div>
    <div className="form-group">
      <label>Болели ли вы чем-нибудь в данный момент?</label>
    </div>
    <div className="form-group">
      <label>Наличие следующих заболеваний высокого давление, рафит, туберкулез, астме, гепатиты, аллергия, проведенные операции (дата и название операции)</label>
      <textarea placeholder="" style={{ minHeight: '70px' }} />
    </div>
    <button className="form-submit-btn">Отправить запрос &gt;</button>
  </div>
);

const CheckUpForm = () => (
  <div className="form-main">
    <div className="form-row">
      <div className="form-group">
        <label>ФИО пациента</label>
        <input type="text" defaultValue="Виктория" className="highlighted" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Гражданство</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Дата рождения</label>
        <div className="date-row">
          <input type="text" placeholder="день" />
          <input type="text" placeholder="месяц" />
          <input type="text" placeholder="год" />
        </div>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Пол</label>
        <div className="radio-group">
          <label className="radio-option"><input type="radio" name="gender-c" defaultChecked /> Женский</label>
          <label className="radio-option"><input type="radio" name="gender-c" /> Мужской</label>
        </div>
      </div>
      <div className="form-group">
        <label>Телефон</label>
        <input type="tel" />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Дата прибытия</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Дата вылета</label>
        <input type="text" />
      </div>
    </div>
    <div className="form-group">
      <label>Вид программы</label>
      <input type="text" />
    </div>
    <div className="form-group">
      <label style={{ fontSize: '12px', color: '#888' }}>Если программа включает ПЭТ-КТ принимаете в ближайшее время вещество/препараты которые отдавали лечения, опишите изменения, которые вы принимали за 2 дня до обследования</label>
    </div>
    <div className="form-group">
      <label>История аллергических реакций</label>
      <textarea placeholder="Прошу оставить список с симптомами" style={{ minHeight: '80px' }} />
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>На пищевые продукты</label>
        <textarea placeholder="" style={{ minHeight: '80px' }} />
      </div>
      <div className="form-group">
        <label>На лекарственные препараты (контр.вещество и др.)</label>
        <textarea placeholder="" style={{ minHeight: '80px' }} />
      </div>
    </div>
    <div className="form-group">
      <label>Наличие следующих заболеваний: астма, онкология, рак и др</label>
      <textarea placeholder="" style={{ minHeight: '60px' }} />
    </div>
    <button className="form-submit-btn">Отправить запрос &gt;</button>
  </div>
);

const InfertilityForm = () => {
  const [gender, setGender] = useState('female');
  return (
    <div className="form-main">
      <div className="infertility-tabs">
        <button className={`infertility-tab ${gender === 'female' ? 'active' : ''}`} onClick={() => setGender('female')}>Женское</button>
        <button className={`infertility-tab ${gender === 'male' ? 'active' : ''}`} onClick={() => setGender('male')}>Мужское</button>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>ФИО пациента</label>
          <input type="text" defaultValue={gender === 'female' ? 'Виктория' : 'Джон'} className="highlighted" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Телефон</label>
          <input type="tel" />
        </div>
        <div className="form-group">
          <label>Дата рождения</label>
          <div className="date-row">
            <input type="text" placeholder="день" />
            <input type="text" placeholder="месяц" />
            <input type="text" placeholder="год" />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Номер паспорта</label>
        <div className="upload-row">
          <input type="text" style={{ flex: 1 }} />
          <button className="upload-btn">Загрузить</button>
          <span className="upload-hint">passport_1.jpg ×</span>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Рост</label>
          <input type="text" />
        </div>
        <div className="form-group">
          <label>Вес</label>
          <input type="text" />
        </div>
      </div>
      <div className="form-group">
        <label>Давление</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Доктор (если есть поличение по конкретному доктора)</label>
        <input type="text" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>ФИО супруга</label>
          <input type="text" defaultValue={gender === 'female' ? 'Рахимбек' : 'Кайназгур'} className="highlighted" />
        </div>
        <div className="form-group">
          <label>Email супруга</label>
          <input type="email" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label>Телефон супруга</label>
          <input type="tel" />
        </div>
        <div className="form-group">
          <label>Дата рождения супруга</label>
          <div className="date-row">
            <input type="text" placeholder="день" />
            <input type="text" placeholder="месяц" />
            <input type="text" placeholder="год" />
          </div>
        </div>
      </div>
      <div className="form-group">
        <label>Длительность бесплодия, диагноз и причина бесплодия (если известно)</label>
        <textarea placeholder="Анализ показал..." />
      </div>
      <button className="form-submit-btn">Отправить запрос &gt;</button>
    </div>
  );
};

const NeurologyForm = () => (
  <div className="form-main">
    <div className="form-row">
      <div className="form-group">
        <label>ФИО пациента</label>
        <input type="text" defaultValue="Виктория" className="highlighted" />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input type="email" />
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Гражданство</label>
        <input type="text" />
      </div>
      <div className="form-group">
        <label>Дата рождения</label>
        <div className="date-row">
          <input type="text" placeholder="день" />
          <input type="text" placeholder="месяц" />
          <input type="text" placeholder="год" />
        </div>
      </div>
    </div>
    <div className="form-row">
      <div className="form-group">
        <label>Пол</label>
        <div className="radio-group">
          <label className="radio-option"><input type="radio" name="gender-n" defaultChecked /> Женский</label>
          <label className="radio-option"><input type="radio" name="gender-n" /> Мужской</label>
        </div>
      </div>
      <div className="form-group">
        <label>Телефон</label>
        <input type="tel" />
      </div>
    </div>
    <div className="form-group">
      <label>Неврологические симптомы 1 (Дата появления год/месяц/день)</label>
      <textarea placeholder="Анализ показал..." style={{ minHeight: '100px' }} />
    </div>
    <div className="form-group">
      <label>Неврологические симптомы 2 (Дата появления год/месяц/день)</label>
      <textarea placeholder="Анализ показал..." style={{ minHeight: '100px' }} />
    </div>
    <div className="form-group">
      <label>Неврологические симптомы 3 (Дата появления год/месяц/день)</label>
      <textarea placeholder="Анализ показал..." style={{ minHeight: '100px' }} />
    </div>
    <div className="form-group">
      <label>Родовой анамнез</label>
      <textarea placeholder="" style={{ minHeight: '80px' }} />
    </div>
    <button className="form-submit-btn">Отправить запрос &gt;</button>
  </div>
);

const RequestForm = () => {
  const { clinicId } = useParams();
  const [activeTab, setActiveTab] = useState('general');
  const clinic = clinics.find(c => c.id === parseInt(clinicId)) || clinics[0];

  const renderForm = () => {
    switch (activeTab) {
      case 'general': return <GeneralForm />;
      case 'treatment': return <TreatmentForm />;
      case 'beauty': return <BeautyForm />;
      case 'checkup': return <CheckUpForm />;
      case 'infertility': return <InfertilityForm />;
      case 'neurology': return <NeurologyForm />;
      default: return <GeneralForm />;
    }
  };

  return (
    <div className="form-page">
      <Header />
      <div className="container">
        <div className="form-container">
          <h1 className="form-title">Отправить запрос</h1>
          <div className="form-selected-clinic">
            Выбранная клиника: <span>{clinic.name}</span>
          </div>

          <div className="form-type-tabs">
            {TABS.map(tab => (
              <button
                key={tab.id}
                className={`form-type-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="form-layout">
            {renderForm()}
            <FormSidebar />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RequestForm;

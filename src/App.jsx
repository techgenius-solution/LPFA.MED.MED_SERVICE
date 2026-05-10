import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Treatment from './pages/Treatment';
import Beauty from './pages/Beauty';
import CheckUp from './pages/CheckUp';
import Eastern from './pages/Eastern';
import FutureMedicine from './pages/FutureMedicine';
import ClinicDetail from './pages/ClinicDetail';
import RequestForm from './pages/RequestForm';
import { PromotionsList, PromotionDetail } from './pages/Promotions';
import { BlogList, BlogArticle } from './pages/Blog';
import AboutUs from './pages/AboutUs';
import Media from './pages/Media';
import Contacts from './pages/Contacts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/treatment" element={<Treatment />} />
        <Route path="/beauty" element={<Beauty />} />
        <Route path="/checkup" element={<CheckUp />} />
        <Route path="/eastern" element={<Eastern />} />
        <Route path="/future" element={<FutureMedicine />} />
        <Route path="/clinic/:id" element={<ClinicDetail />} />
        <Route path="/request/:clinicId" element={<RequestForm />} />
        <Route path="/promotions" element={<PromotionsList />} />
        <Route path="/promotions/:id" element={<PromotionDetail />} />
        <Route path="/blog" element={<BlogList />} />
        <Route path="/blog/:id" element={<BlogArticle />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/media" element={<Media />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

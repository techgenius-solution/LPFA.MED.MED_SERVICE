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

import { AuthProvider } from './auth/AuthContext';
import { ToastProvider } from './auth/Toast';
import ProtectedRoute from './auth/ProtectedRoute';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import EmailVerification from './pages/auth/EmailVerification';
import Profile from './pages/auth/Profile';
import Dashboard from './pages/auth/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/treatment" element={<Treatment />} />
            <Route path="/beauty" element={<Beauty />} />
            <Route path="/checkup" element={<CheckUp />} />
            <Route path="/eastern" element={<Eastern />} />
            <Route path="/future" element={<FutureMedicine />} />
            <Route path="/clinic/:id" element={<ClinicDetail />} />
            <Route
              path="/request/:clinicId"
              element={
                <ProtectedRoute>
                  <RequestForm />
                </ProtectedRoute>
              }
            />
            <Route path="/promotions" element={<PromotionsList />} />
            <Route path="/promotions/:id" element={<PromotionDetail />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:id" element={<BlogArticle />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/media" element={<Media />} />
            <Route path="/contacts" element={<Contacts />} />

            {/* Auth routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/verify-email" element={<EmailVerification />} />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}

export default App;

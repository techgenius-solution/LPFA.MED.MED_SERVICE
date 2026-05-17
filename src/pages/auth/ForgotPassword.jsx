import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import FormInput from '../../components/auth/FormInput';
import { useAuth } from '../../auth/AuthContext';
import { useToast } from '../../auth/Toast';
import { validateEmail } from '../../auth/validation';
import '../../styles/Auth.css';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(null); // { resetToken? } or true

  const submit = async (e) => {
    e.preventDefault();
    const er = validateEmail(email);
    setError(er);
    if (er) return;
    setBusy(true);
    try {
      const res = await forgotPassword({ email });
      setSent(res);
      if (res.resetToken) {
        toast.info('Ссылка для сброса сгенерирована (демо)', { duration: 6000 });
      }
    } finally {
      setBusy(false);
    }
  };

  if (sent) {
    return (
      <AuthLayout
        title="Проверьте почту"
        subtitle={`Если аккаунт с адресом ${email} существует, мы отправили инструкции по сбросу пароля.`}
      >
        <div className="auth-banner success">
          ✓ Письмо со ссылкой для сброса отправлено
        </div>
        {sent.resetToken && (
          <div className="demo-hint" style={{ marginTop: 14 }}>
            Демо: реальная почта не отправлена. Откройте{' '}
            <Link
              to={`/reset-password?token=${sent.resetToken}`}
              className="auth-link"
            >
              ссылку для сброса
            </Link>
            .
          </div>
        )}
        <div className="auth-foot" style={{ marginTop: 18 }}>
          <Link to="/login" className="auth-link">
            ← Вернуться к входу
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Сброс пароля"
      subtitle="Введите email, и мы пришлём ссылку для восстановления доступа"
    >
      <form className="auth-form" onSubmit={submit} noValidate>
        <FormInput
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setError(validateEmail(email))}
          error={error}
        />

        <button type="submit" className="auth-btn" disabled={busy}>
          {busy && <span className="spinner" />}
          {busy ? 'Отправляем…' : 'Отправить ссылку'}
        </button>
      </form>

      <div className="auth-foot">
        Вспомнили пароль?{' '}
        <Link to="/login" className="auth-link">
          Войти
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;

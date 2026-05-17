import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import FormInput from '../../components/auth/FormInput';
import PasswordInput from '../../components/auth/PasswordInput';
import { useAuth } from '../../auth/AuthContext';
import { useToast } from '../../auth/Toast';
import { validateEmail } from '../../auth/validation';
import '../../styles/Auth.css';

const Login = () => {
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);

  const validate = () => {
    const e = {};
    const emailErr = validateEmail(email);
    if (emailErr) e.email = emailErr;
    if (!password) e.password = 'Введите пароль';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setServerError('');
    if (!validate()) return;
    setBusy(true);
    try {
      const user = await login({ email, password, remember });
      toast.success(`Добро пожаловать, ${user.name.split(' ')[0]}!`);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const useDemo = () => {
    setEmail('demo@smartmed.ru');
    setPassword('Demo1234!');
  };

  return (
    <AuthLayout
      title="Вход в личный кабинет"
      subtitle="Войдите, чтобы продолжить работу со SmartMed Service"
    >
      {serverError && <div className="auth-banner">{serverError}</div>}

      <form className="auth-form" onSubmit={submit} noValidate>
        <FormInput
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => {
            const er = validateEmail(email);
            setErrors((p) => ({ ...p, email: er }));
          }}
          error={errors.email}
        />

        <PasswordInput
          placeholder="Пароль"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />

        <div className="auth-row">
          <label className="checkbox">
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Запомнить меня
          </label>
          <Link to="/forgot-password" className="auth-link">
            Забыли пароль?
          </Link>
        </div>

        <button type="submit" className="auth-btn" disabled={busy}>
          {busy ? <span className="spinner" /> : null}
          {busy ? 'Входим…' : 'Войти'}
        </button>

        <div className="auth-divider">или</div>

        <div className="social-row">
          <button
            type="button"
            className="social-btn"
            onClick={() => toast.info('Демо: соц. вход не настроен')}
          >
            <span>G</span> Google
          </button>
          <button
            type="button"
            className="social-btn"
            onClick={() => toast.info('Демо: соц. вход не настроен')}
          >
            <span>VK</span> ВКонтакте
          </button>
        </div>

        <button type="button" className="auth-btn auth-btn-ghost" onClick={useDemo}>
          Заполнить демо-данными
        </button>

        <div className="demo-hint">
          Демо: <code>demo@smartmed.ru</code> / <code>Demo1234!</code>
        </div>
      </form>

      <div className="auth-foot">
        Нет аккаунта?{' '}
        <Link to="/signup" className="auth-link">
          Зарегистрироваться
        </Link>
      </div>
    </AuthLayout>
  );
};

export default Login;

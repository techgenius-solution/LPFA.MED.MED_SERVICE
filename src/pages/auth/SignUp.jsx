import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import FormInput from '../../components/auth/FormInput';
import PasswordInput from '../../components/auth/PasswordInput';
import PasswordStrength from '../../components/auth/PasswordStrength';
import { useAuth } from '../../auth/AuthContext';
import { useToast } from '../../auth/Toast';
import {
  validateConfirm,
  validateEmail,
  validateName,
  validatePassword,
  validatePhone,
} from '../../auth/validation';
import '../../styles/Auth.css';

const SignUp = () => {
  const { register } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirm: '',
    agree: false,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);

  const set = (k) => (e) =>
    setForm((p) => ({
      ...p,
      [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value,
    }));

  const validate = () => {
    const e = {};
    const nE = validateName(form.name);
    if (nE) e.name = nE;
    const emE = validateEmail(form.email);
    if (emE) e.email = emE;
    const phE = validatePhone(form.phone);
    if (phE) e.phone = phE;
    const pwE = validatePassword(form.password);
    if (pwE) e.password = pwE;
    const cE = validateConfirm(form.password, form.confirm);
    if (cE) e.confirm = cE;
    if (!form.agree) e.agree = 'Подтвердите согласие';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    setServerError('');
    if (!validate()) return;
    setBusy(true);
    try {
      const { verificationCode } = await register({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        password: form.password,
      });
      toast.success(
        `Аккаунт создан! Код подтверждения: ${verificationCode} (демо)`,
        { duration: 9000 }
      );
      navigate('/verify-email', { state: { email: form.email.trim() } });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout
      title="Создать аккаунт"
      subtitle="Регистрация займёт меньше минуты"
    >
      {serverError && <div className="auth-banner">{serverError}</div>}

      <form className="auth-form" onSubmit={submit} noValidate>
        <FormInput
          label="Имя"
          placeholder="Иван Иванов"
          autoComplete="name"
          value={form.name}
          onChange={set('name')}
          onBlur={() =>
            setErrors((p) => ({ ...p, name: validateName(form.name) }))
          }
          error={errors.name}
        />
        <FormInput
          label="Email"
          type="email"
          placeholder="name@example.com"
          autoComplete="email"
          value={form.email}
          onChange={set('email')}
          onBlur={() =>
            setErrors((p) => ({ ...p, email: validateEmail(form.email) }))
          }
          error={errors.email}
        />
        <FormInput
          label="Телефон (необязательно)"
          type="tel"
          placeholder="+7 999 123-45-67"
          autoComplete="tel"
          value={form.phone}
          onChange={set('phone')}
          onBlur={() =>
            setErrors((p) => ({ ...p, phone: validatePhone(form.phone) }))
          }
          error={errors.phone}
        />
        <PasswordInput
          placeholder="Минимум 8 символов"
          autoComplete="new-password"
          value={form.password}
          onChange={set('password')}
          error={errors.password}
        />
        <PasswordStrength value={form.password} />
        <PasswordInput
          label="Повторите пароль"
          placeholder="Повторите пароль"
          autoComplete="new-password"
          value={form.confirm}
          onChange={set('confirm')}
          error={errors.confirm}
        />

        <label className="checkbox">
          <input type="checkbox" checked={form.agree} onChange={set('agree')} />
          <span>
            Принимаю{' '}
            <Link to="/about" className="auth-link">
              условия использования
            </Link>{' '}
            и обработку персональных данных
          </span>
        </label>
        {errors.agree && (
          <span className="field-msg field-msg-error">{errors.agree}</span>
        )}

        <button type="submit" className="auth-btn" disabled={busy}>
          {busy && <span className="spinner" />}
          {busy ? 'Создаём аккаунт…' : 'Зарегистрироваться'}
        </button>
      </form>

      <div className="auth-foot">
        Уже есть аккаунт?{' '}
        <Link to="/login" className="auth-link">
          Войти
        </Link>
      </div>
    </AuthLayout>
  );
};

export default SignUp;

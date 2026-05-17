import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import PasswordInput from '../../components/auth/PasswordInput';
import PasswordStrength from '../../components/auth/PasswordStrength';
import { useAuth } from '../../auth/AuthContext';
import { useToast } from '../../auth/Toast';
import { validateConfirm, validatePassword } from '../../auth/validation';
import '../../styles/Auth.css';

const ResetPassword = () => {
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const { resetPassword } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);

  if (!token) {
    return (
      <AuthLayout title="Ссылка недействительна" subtitle="Токен сброса пароля не найден">
        <div className="auth-banner">
          Эта ссылка не содержит токен для сброса пароля.
        </div>
        <div className="auth-foot" style={{ marginTop: 18 }}>
          <Link to="/forgot-password" className="auth-link">
            Запросить новую ссылку
          </Link>
        </div>
      </AuthLayout>
    );
  }

  const submit = async (e) => {
    e.preventDefault();
    setServerError('');
    const errs = {};
    const pE = validatePassword(password);
    if (pE) errs.password = pE;
    const cE = validateConfirm(password, confirm);
    if (cE) errs.confirm = cE;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setBusy(true);
    try {
      await resetPassword({ token, password });
      toast.success('Пароль успешно изменён. Войдите снова.');
      navigate('/login', { replace: true });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Новый пароль" subtitle="Придумайте надёжный пароль для входа">
      {serverError && <div className="auth-banner">{serverError}</div>}
      <form className="auth-form" onSubmit={submit} noValidate>
        <PasswordInput
          label="Новый пароль"
          placeholder="Минимум 8 символов"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={errors.password}
        />
        <PasswordStrength value={password} />
        <PasswordInput
          label="Повторите пароль"
          autoComplete="new-password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          error={errors.confirm}
        />
        <button type="submit" className="auth-btn" disabled={busy}>
          {busy && <span className="spinner" />}
          {busy ? 'Сохраняем…' : 'Сохранить пароль'}
        </button>
      </form>
      <div className="auth-foot">
        <Link to="/login" className="auth-link">
          ← Вернуться к входу
        </Link>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;

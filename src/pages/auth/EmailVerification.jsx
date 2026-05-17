import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AuthLayout from '../../components/auth/AuthLayout';
import { useAuth } from '../../auth/AuthContext';
import { useToast } from '../../auth/Toast';
import '../../styles/Auth.css';

const LEN = 6;

const EmailVerification = () => {
  const { user, verifyEmail, resendVerification } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || user?.email || '';

  const [code, setCode] = useState(Array(LEN).fill(''));
  const [busy, setBusy] = useState(false);
  const [serverError, setServerError] = useState('');
  const [cooldown, setCooldown] = useState(0);
  const inputs = useRef([]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown((c) => Math.max(0, c - 1)), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  useEffect(() => {
    if (user?.verified) {
      navigate('/profile', { replace: true });
    }
  }, [user, navigate]);

  if (!email) {
    return (
      <AuthLayout title="Email не указан" subtitle="">
        <div className="auth-banner">
          Чтобы подтвердить email, сначала зарегистрируйтесь или войдите.
        </div>
        <div className="auth-foot" style={{ marginTop: 18 }}>
          <Link to="/signup" className="auth-link">
            Регистрация
          </Link>
        </div>
      </AuthLayout>
    );
  }

  const onChange = (i, v) => {
    const digit = v.replace(/\D/g, '').slice(-1);
    setCode((prev) => {
      const next = [...prev];
      next[i] = digit;
      return next;
    });
    if (digit && i < LEN - 1) inputs.current[i + 1]?.focus();
  };

  const onKey = (i, e) => {
    if (e.key === 'Backspace' && !code[i] && i > 0) {
      inputs.current[i - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && i > 0) inputs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < LEN - 1) inputs.current[i + 1]?.focus();
  };

  const onPaste = (e) => {
    const text = (e.clipboardData.getData('text') || '').replace(/\D/g, '').slice(0, LEN);
    if (!text) return;
    e.preventDefault();
    const next = Array(LEN).fill('');
    for (let i = 0; i < text.length; i++) next[i] = text[i];
    setCode(next);
    inputs.current[Math.min(text.length, LEN - 1)]?.focus();
  };

  const submit = async (e) => {
    e?.preventDefault();
    setServerError('');
    const joined = code.join('');
    if (joined.length !== LEN) {
      setServerError('Введите 6 цифр кода');
      return;
    }
    setBusy(true);
    try {
      await verifyEmail({ email, code: joined });
      toast.success('Email подтверждён');
      navigate('/profile', { replace: true });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    if (cooldown > 0) return;
    try {
      const { verificationCode } = await resendVerification({ email });
      toast.success(`Код отправлен. Демо-код: ${verificationCode}`, { duration: 8000 });
      setCooldown(30);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <AuthLayout
      title="Подтвердите email"
      subtitle={`Мы отправили 6-значный код на ${email}`}
    >
      {serverError && <div className="auth-banner">{serverError}</div>}

      <form className="auth-form" onSubmit={submit}>
        <div className="code-input" onPaste={onPaste}>
          {code.map((d, i) => (
            <input
              key={i}
              ref={(el) => (inputs.current[i] = el)}
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => onChange(i, e.target.value)}
              onKeyDown={(e) => onKey(i, e)}
              aria-label={`Цифра ${i + 1}`}
            />
          ))}
        </div>

        <button type="submit" className="auth-btn" disabled={busy}>
          {busy && <span className="spinner" />}
          {busy ? 'Проверяем…' : 'Подтвердить'}
        </button>

        <button
          type="button"
          className="auth-btn auth-btn-ghost"
          onClick={resend}
          disabled={cooldown > 0}
        >
          {cooldown > 0 ? `Отправить код повторно (${cooldown}s)` : 'Отправить код повторно'}
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

export default EmailVerification;

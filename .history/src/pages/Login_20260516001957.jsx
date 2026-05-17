import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { validateForm } from '../auth/validation';
import '../styles/Auth.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, isLoading, error, setError } = useAuth();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  // Load remembered email if exists
  useEffect(() => {
    const rememberMe = localStorage.getItem('rememberMe');
    const rememberedEmail = localStorage.getItem('rememberedEmail');

    if (rememberMe && rememberedEmail) {
      setFormData((prev) => ({
        ...prev,
        email: rememberedEmail,
        rememberMe: true,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }

    setLocalError('');
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errors: validationErrors } = validateForm(formData, ['email', 'password']);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    const result = await login(formData.email, formData.password, formData.rememberMe);

    if (result.success) {
      navigate('/');
    } else {
      setLocalError(result.error);
    }
  };

  const displayError = localError || error;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">TG</div>
          <h1 className="auth-title">Welcome Back</h1>
          <p className="auth-subtitle">Sign in to your account to continue</p>
        </div>

        {displayError && (
          <div className="alert alert-error">
            <span className="alert-icon">✕</span>
            <div>{displayError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
            />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          <div className="checkbox-group">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              className="checkbox-input"
              checked={formData.rememberMe}
              onChange={handleChange}
              disabled={isLoading}
            />
            <label htmlFor="rememberMe" className="checkbox-label">
              Remember me
            </label>
            <Link to="/forgot-password" className="checkbox-label" style={{ marginLeft: 'auto', marginBottom: 0 }}>
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="divider">or continue with</div>

        <div className="social-buttons">
          <button className="social-btn" title="Google Login" disabled={isLoading}>
            🔵
          </button>
          <button className="social-btn" title="GitHub Login" disabled={isLoading}>
            ⚫
          </button>
          <button className="social-btn" title="Facebook Login" disabled={isLoading}>
            🔷
          </button>
        </div>

        <div className="auth-footer">
          <p className="auth-footer-text">
            Don't have an account?{' '}
            <Link to="/signup" className="auth-footer-link">
              Sign up
            </Link>
          </p>
          <p className="auth-footer-text" style={{ marginTop: '0.5rem', fontSize: 'clamp(0.7rem, 1.8vw, 0.75rem)' }}>
            By signing in, you agree to our{' '}
            <a href="#" className="auth-footer-link">Terms</a>
            {' '}and{' '}
            <a href="#" className="auth-footer-link">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

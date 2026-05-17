import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import { validateForm, getPasswordStrength } from '../auth/validation';
import '../styles/Auth.css';

const SignUp = () => {
  const navigate = useNavigate();
  const { register, isLoading, error, setError } = useAuth();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    strength: 0,
    level: 'weak',
    color: '#d32f2f',
    feedback: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'password') {
      setPasswordStrength(getPasswordStrength(value));
    }

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

    const { isValid, errors: validationErrors } = validateForm(formData, [
      'firstName',
      'lastName',
      'email',
      'password',
      'confirmPassword',
    ]);

    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    if (!formData.terms) {
      setErrors({
        terms: 'You must agree to the terms and conditions',
      });
      return;
    }

    const result = await register({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    });

    if (result.success) {
      // Navigate to verification screen
      navigate('/verify-email', { state: { email: formData.email } });
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
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join us and start your journey today</p>
        </div>

        {displayError && (
          <div className="alert alert-error">
            <span className="alert-icon">✕</span>
            <div>{displayError}</div>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(0.75rem, 2vw, 1rem)' }}>
            <div className="form-group">
              <label className="form-label">First Name</label>
              <input
                type="text"
                name="firstName"
                className="form-input"
                placeholder="John"
                value={formData.firstName}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.firstName && <div className="form-error">{errors.firstName}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                name="lastName"
                className="form-input"
                placeholder="Doe"
                value={formData.lastName}
                onChange={handleChange}
                disabled={isLoading}
              />
              {errors.lastName && <div className="form-error">{errors.lastName}</div>}
            </div>
          </div>

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
                placeholder="Create a strong password"
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

            {formData.password && (
              <div className="password-strength">
                <div className="strength-bar">
                  <div
                    className="strength-progress"
                    style={{
                      width: `${(passwordStrength.strength / 6) * 100}%`,
                      backgroundColor: passwordStrength.color,
                    }}
                  />
                </div>
                <div className="strength-text" style={{ color: passwordStrength.color }}>
                  {passwordStrength.level.charAt(0).toUpperCase() + passwordStrength.level.slice(1)} Password
                </div>
                {passwordStrength.feedback.length > 0 && (
                  <ul className="strength-feedback">
                    {passwordStrength.feedback.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}

            {errors.password && <div className="form-error">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <div className="password-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="form-input"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {errors.confirmPassword && <div className="form-error">{errors.confirmPassword}</div>}
          </div>

          <div className="checkbox-group" style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="checkbox-input"
              checked={formData.terms}
              onChange={handleChange}
              disabled={isLoading}
            />
            <label htmlFor="terms" className="checkbox-label">
              I agree to the{' '}
              <a href="#" className="auth-footer-link">
                Terms of Service
              </a>
              {' '}and{' '}
              <a href="#" className="auth-footer-link">
                Privacy Policy
              </a>
            </label>
          </div>

          {errors.terms && <div className="form-error" style={{ marginBottom: '1rem' }}>{errors.terms}</div>}

          <button
            type="submit"
            className="auth-btn"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="divider">or sign up with</div>

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
            Already have an account?{' '}
            <Link to="/login" className="auth-footer-link">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

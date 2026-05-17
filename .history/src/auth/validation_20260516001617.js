export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const getPasswordStrength = (password) => {
  let strength = 0;
  let feedback = [];

  if (password.length >= 8) strength++;
  else feedback.push('At least 8 characters');

  if (password.length >= 12) strength++;
  else feedback.push('At least 12 characters for strong password');

  if (/[a-z]/.test(password)) strength++;
  else feedback.push('Add lowercase letters');

  if (/[A-Z]/.test(password)) strength++;
  else feedback.push('Add uppercase letters');

  if (/[0-9]/.test(password)) strength++;
  else feedback.push('Add numbers');

  if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) strength++;
  else feedback.push('Add special characters');

  let level = 'weak';
  let color = '#d32f2f';

  if (strength >= 5) {
    level = 'strong';
    color = '#388e3c';
  } else if (strength >= 3) {
    level = 'fair';
    color = '#f57c00';
  }

  return { strength, level, color, feedback };
};

export const validateForm = (formData, requiredFields) => {
  const errors = {};

  requiredFields.forEach((field) => {
    if (!formData[field] || formData[field].trim() === '') {
      errors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
    }
  });

  if (formData.email && !validateEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (formData.password && !validatePassword(formData.password)) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }

  if (formData.firstName && formData.firstName.length < 2) {
    errors.firstName = 'First name must be at least 2 characters';
  }

  if (formData.lastName && formData.lastName.length < 2) {
    errors.lastName = 'Last name must be at least 2 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const sanitizeInput = (input) => {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .slice(0, 255);
};

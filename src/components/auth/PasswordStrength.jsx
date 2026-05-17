import React from 'react';
import { passwordStrength } from '../../auth/validation';

const PasswordStrength = ({ value }) => {
  const { score, label, percent } = passwordStrength(value || '');
  if (!value) return null;
  const cls =
    score <= 1 ? 'weak' : score === 2 ? 'fair' : score === 3 ? 'good' : 'strong';
  return (
    <div className="pw-strength">
      <div className="pw-strength-bar">
        <div className={`pw-strength-fill ${cls}`} style={{ width: `${percent}%` }} />
      </div>
      <div className={`pw-strength-label ${cls}`}>{label}</div>
    </div>
  );
};

export default PasswordStrength;

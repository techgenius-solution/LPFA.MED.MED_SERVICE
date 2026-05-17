import React from 'react';

const FormInput = ({
  label,
  error,
  hint,
  type = 'text',
  iconLeft,
  iconRight,
  ...rest
}) => {
  return (
    <label className={`field ${error ? 'field-error' : ''}`}>
      {label && <span className="field-label">{label}</span>}
      <span className="field-input-wrap">
        {iconLeft && <span className="field-icon left">{iconLeft}</span>}
        <input className="field-input" type={type} {...rest} />
        {iconRight && <span className="field-icon right">{iconRight}</span>}
      </span>
      {error ? (
        <span className="field-msg field-msg-error">{error}</span>
      ) : hint ? (
        <span className="field-msg field-msg-hint">{hint}</span>
      ) : null}
    </label>
  );
};

export default FormInput;

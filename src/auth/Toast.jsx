import React, { createContext, useCallback, useContext, useState } from 'react';

const ToastContext = createContext(null);

let id = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((tid) => {
    setToasts((cur) => cur.filter((t) => t.id !== tid));
  }, []);

  const push = useCallback(
    (toast) => {
      const tid = ++id;
      setToasts((cur) => [...cur, { ...toast, id: tid }]);
      setTimeout(() => remove(tid), toast.duration || 4000);
    },
    [remove]
  );

  const api = {
    success: (msg, opts) => push({ type: 'success', message: msg, ...opts }),
    error: (msg, opts) => push({ type: 'error', message: msg, ...opts }),
    info: (msg, opts) => push({ type: 'info', message: msg, ...opts }),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast-stack" role="status" aria-live="polite">
        {toasts.map((t) => (
          <div key={t.id} className={`toast toast-${t.type}`}>
            <span className="toast-icon">
              {t.type === 'success' ? '✓' : t.type === 'error' ? '!' : 'i'}
            </span>
            <span className="toast-msg">{t.message}</span>
            <button className="toast-close" onClick={() => remove(t.id)} aria-label="Закрыть">
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside ToastProvider');
  return ctx;
};

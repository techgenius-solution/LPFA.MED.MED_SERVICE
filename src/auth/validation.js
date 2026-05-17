export const validateEmail = (email) => {
  if (!email) return 'Введите email';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Некорректный email';
  return null;
};

export const validateName = (name) => {
  if (!name || !name.trim()) return 'Введите имя';
  if (name.trim().length < 2) return 'Имя слишком короткое';
  return null;
};

export const validatePhone = (phone) => {
  if (!phone) return null; // optional
  if (!/^[\d\s+()-]{7,20}$/.test(phone)) return 'Некорректный телефон';
  return null;
};

export const passwordStrength = (pw) => {
  let score = 0;
  if (!pw) return { score: 0, label: '', percent: 0 };
  if (pw.length >= 8) score++;
  if (/[A-ZА-Я]/.test(pw)) score++;
  if (/[a-zа-я]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^A-Za-zА-Яа-я0-9]/.test(pw)) score++;
  const labels = ['Очень слабый', 'Слабый', 'Средний', 'Хороший', 'Надёжный'];
  return {
    score,
    label: pw.length === 0 ? '' : labels[Math.max(0, score - 1)] || labels[0],
    percent: Math.min(100, (score / 5) * 100),
  };
};

export const validatePassword = (pw) => {
  if (!pw) return 'Введите пароль';
  if (pw.length < 8) return 'Минимум 8 символов';
  if (!/[A-Za-zА-Яа-я]/.test(pw)) return 'Должны быть буквы';
  if (!/\d/.test(pw)) return 'Должна быть цифра';
  return null;
};

export const validateConfirm = (pw, confirm) => {
  if (!confirm) return 'Подтвердите пароль';
  if (pw !== confirm) return 'Пароли не совпадают';
  return null;
};

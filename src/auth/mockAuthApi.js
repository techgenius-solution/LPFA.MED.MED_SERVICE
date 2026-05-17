// Mock auth API. Simulates a backend with localStorage as the user "database"
// and a fake JWT-like token. All methods return a Promise that resolves after a delay.

const USERS_KEY = 'smartmed_users';
const RESETS_KEY = 'smartmed_resets';
const VERIFICATIONS_KEY = 'smartmed_verifications';

const delay = (ms = 700) => new Promise((r) => setTimeout(r, ms));

const loadUsers = () => {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const loadResets = () => {
  try {
    return JSON.parse(localStorage.getItem(RESETS_KEY)) || {};
  } catch {
    return {};
  }
};

const saveResets = (r) => localStorage.setItem(RESETS_KEY, JSON.stringify(r));

const loadVerifications = () => {
  try {
    return JSON.parse(localStorage.getItem(VERIFICATIONS_KEY)) || {};
  } catch {
    return {};
  }
};

const saveVerifications = (v) =>
  localStorage.setItem(VERIFICATIONS_KEY, JSON.stringify(v));

// Seed with a demo user on first run
const seedDemo = () => {
  const users = loadUsers();
  if (!users.some((u) => u.email === 'demo@smartmed.ru')) {
    users.push({
      id: 'u_demo',
      email: 'demo@smartmed.ru',
      password: 'Demo1234!',
      name: 'Демо Пользователь',
      phone: '+7 999 000-00-00',
      avatar: null,
      verified: true,
      createdAt: new Date().toISOString(),
    });
    saveUsers(users);
  }
};

seedDemo();

// Tiny fake JWT — not real signing, just base64-encoded payload
const fakeJwt = (payload) => {
  const header = btoa(JSON.stringify({ alg: 'mock', typ: 'JWT' }));
  const body = btoa(JSON.stringify({ ...payload, iat: Date.now() }));
  const sig = btoa(`mocksig_${payload.sub}_${Date.now()}`);
  return `${header}.${body}.${sig}`;
};

const sanitize = (user) => {
  const { password, ...rest } = user;
  return rest;
};

const genCode = () => Math.floor(100000 + Math.random() * 900000).toString();

export const mockAuthApi = {
  async register({ name, email, password, phone }) {
    await delay(900);
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error('Пользователь с таким email уже зарегистрирован');
    }
    const user = {
      id: `u_${Date.now()}`,
      email,
      password,
      name,
      phone: phone || '',
      avatar: null,
      verified: false,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    saveUsers(users);

    const verifications = loadVerifications();
    const code = genCode();
    verifications[email.toLowerCase()] = { code, createdAt: Date.now() };
    saveVerifications(verifications);

    const token = fakeJwt({ sub: user.id, email });
    return { user: sanitize(user), token, verificationCode: code };
  },

  async login({ email, password }) {
    await delay(700);
    const users = loadUsers();
    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!user) throw new Error('Пользователь не найден');
    if (user.password !== password) throw new Error('Неверный пароль');
    const token = fakeJwt({ sub: user.id, email });
    return { user: sanitize(user), token };
  },

  async verifyEmail({ email, code }) {
    await delay(600);
    const verifications = loadVerifications();
    const v = verifications[email.toLowerCase()];
    if (!v) throw new Error('Код подтверждения не найден. Запросите новый.');
    if (v.code !== code) throw new Error('Неверный код подтверждения');

    const users = loadUsers();
    const idx = users.findIndex(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (idx === -1) throw new Error('Пользователь не найден');
    users[idx].verified = true;
    saveUsers(users);

    delete verifications[email.toLowerCase()];
    saveVerifications(verifications);
    return { user: sanitize(users[idx]) };
  },

  async resendVerification({ email }) {
    await delay(500);
    const users = loadUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    if (!exists) throw new Error('Пользователь не найден');

    const verifications = loadVerifications();
    const code = genCode();
    verifications[email.toLowerCase()] = { code, createdAt: Date.now() };
    saveVerifications(verifications);
    return { verificationCode: code };
  },

  async forgotPassword({ email }) {
    await delay(800);
    const users = loadUsers();
    const exists = users.some(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );
    // Don't reveal whether email exists; always succeed
    if (exists) {
      const resets = loadResets();
      const token = `reset_${Math.random().toString(36).slice(2)}_${Date.now()}`;
      resets[token] = {
        email: email.toLowerCase(),
        createdAt: Date.now(),
        used: false,
      };
      saveResets(resets);
      return { ok: true, resetToken: token };
    }
    return { ok: true };
  },

  async resetPassword({ token, password }) {
    await delay(700);
    const resets = loadResets();
    const r = resets[token];
    if (!r) throw new Error('Недействительная ссылка для сброса пароля');
    if (r.used) throw new Error('Ссылка уже использована');
    if (Date.now() - r.createdAt > 60 * 60 * 1000)
      throw new Error('Срок действия ссылки истёк');

    const users = loadUsers();
    const idx = users.findIndex((u) => u.email.toLowerCase() === r.email);
    if (idx === -1) throw new Error('Пользователь не найден');
    users[idx].password = password;
    saveUsers(users);

    resets[token].used = true;
    saveResets(resets);
    return { ok: true };
  },

  async updateProfile({ userId, updates }) {
    await delay(600);
    const users = loadUsers();
    const idx = users.findIndex((u) => u.id === userId);
    if (idx === -1) throw new Error('Пользователь не найден');
    users[idx] = { ...users[idx], ...updates };
    saveUsers(users);
    return { user: sanitize(users[idx]) };
  },
};

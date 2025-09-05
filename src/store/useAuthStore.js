import { create } from "zustand";

// какие e-mail считаем админскими 
const ADMIN_EMAILS = ["admin@mail.ru"];

const KEY_USERS = "users";
const KEY_CURRENT = "currentUser";

const load = (k, fallback) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; }
};
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));

const initialUsers = load(KEY_USERS, []);        // [{id,email,password,role}]
const initialCurrent = load(KEY_CURRENT, null);  // {id,email,role}

const useAuthStore = create((set, get) => ({
  users: initialUsers,
  user: initialCurrent,

  register: async ({ email, password }) => {
    email = (email || "").trim().toLowerCase();
    if (!email || !password) throw new Error("Укажите email и пароль");
    const users = get().users;
    if (users.find(u => u.email === email)) throw new Error("Такой email уже зарегистрирован");

    const newUser = {
      id: Date.now(),
      email,
      password,
      role: ADMIN_EMAILS.includes(email) ? "admin" : "user",
    };
    const next = [...users, newUser];
    save(KEY_USERS, next);
    set({ users: next, user: newUser });
    save(KEY_CURRENT, newUser);
    return newUser;
  },

  login: async ({ email, password, remember }) => {
    email = (email || "").trim().toLowerCase();
    const user = get().users.find(u => u.email === email && u.password === password);
    if (!user) throw new Error("Неверный логин или пароль");
    set({ user });
    if (remember) save(KEY_CURRENT, user);
    else localStorage.removeItem(KEY_CURRENT);
    return user;
  },

  logout: () => {
    set({ user: null });
    localStorage.removeItem(KEY_CURRENT);
  },

  isAdmin: () => {
    const u = get().user;
    return !!u && u.role === "admin";
  },
}));

export default useAuthStore;

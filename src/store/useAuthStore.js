import { create } from "zustand";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, signInWithGoogle, signInWithGithub } from "../Firebase";

const ADMIN_EMAIL = "goudacha@mail.ru";

const useAuthStore = create((set) => ({
  user: null,
  isAdmin: () => false,

  // вход по email
  login: async ({ email, password }) => {
    const cred = await signInWithEmailAndPassword(auth, email, password);
    const user = { email: cred.user.email, uid: cred.user.uid };
    set({ user, isAdmin: () => user.email === ADMIN_EMAIL });
    return user;
  },

  // регистрация
  register: async ({ email, password }) => {
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    const user = { email: cred.user.email, uid: cred.user.uid };
    set({ user, isAdmin: () => user.email === ADMIN_EMAIL });
    return user;
  },

  // вход по Google
  loginWithGoogle: async () => {
    const cred = await signInWithGoogle();
    const user = { email: cred.user.email, uid: cred.user.uid };
    set({ user, isAdmin: () => user.email === ADMIN_EMAIL });
    return user;
  },

  // вход по GitHub
  loginWithGithub: async () => {
    const cred = await signInWithGithub();
    const user = { email: cred.user.email, uid: cred.user.uid };
    set({ user, isAdmin: () => user.email === ADMIN_EMAIL });
    return user;
  },

  // выход
  logout: async () => {
    await signOut(auth);
    set({ user: null, isAdmin: () => false });
  },
}));

export default useAuthStore;


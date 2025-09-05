import { create } from "zustand";

const persisted = (key, initial) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? initial;
  } catch {
    return initial;
  }
};

const useLangStore = create((set) => ({
  lang: persisted("lang", "ru"), // по умолчанию русский.
  setLang: (lang) => {
    localStorage.setItem("lang", JSON.stringify(lang));
    set({ lang });
  },
}));

export default useLangStore

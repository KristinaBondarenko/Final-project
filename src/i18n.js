import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  ru: {
    translation: {
      nav: {
        home: "Главная",
        catalog: "Каталог",
        artists: "Художники",
        news: "Новости",
        search: "Поиск",
      },
      header: { favorites: "Избранное", cart: "Корзина", account: "Аккаунт" },
      footer: {
        subscribeTitle: "Подписка на новости",
        email: "Ваш e-mail",
        subscribe: "Подписаться",
      },
      home: {
        recommendations: "Рекомендации",
        about: "О нас",
        reviews: "Отзывы",
        contacts: "Контакты",
      },
      catalog: {
        sortBy: "Сортировать по",
        price: "цене",
        date: "дате",
        filter: "Фильтр",
        all: "Все",
      },
    },
  },
  en: {
    translation: {
      nav: {
        home: "Home",
        catalog: "Catalog",
        artists: "Artists",
        news: "News",
        search: "Search",
      },
      header: { favorites: "Favorites", cart: "Cart", account: "Account" },
      footer: {
        subscribeTitle: "Newsletter",
        email: "Your e-mail",
        subscribe: "Subscribe",
      },
      home: {
        recommendations: "Recommendations",
        about: "About us",
        reviews: "Reviews",
        contacts: "Contacts",
      },
      catalog: {
        sortBy: "Sort by",
        price: "price",
        date: "date",
        filter: "Filter",
        all: "All",
      },
    },
  },
};

const savedLang = localStorage.getItem("lang") || "ru";

i18n.use(initReactI18next).init({
  resources,
  lng: savedLang, // сразу грузим сохранённый язык.
  fallbackLng: "ru",
  interpolation: { escapeValue: false },
});

export default i18n;

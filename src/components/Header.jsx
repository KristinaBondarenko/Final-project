import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Phone, Send, MessageCircle } from "lucide-react";
import useGalleryStore from "../store/useGalleryStore";
import HeaderAccount from "./HeaderAccount";
import { useTranslation } from "react-i18next";

const Header = () => {
  const favorites = useGalleryStore((s) => s.favorites || []);
  const cart = useGalleryStore((s) => s.cart || []);
  const { t, i18n } = useTranslation();

  const switchLang = () => {
    const next = i18n.language === "ru" ? "en" : "ru";
    i18n.changeLanguage(next);
    localStorage.setItem("lang", next);
  };

  React.useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved && saved !== i18n.language) i18n.changeLanguage(saved);
  }, []);

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container py-2 flex items-center justify-between text-sm">
        {/* --- Контакты --- */}
        <div className="flex items-center gap-6 text-gray-600 mr-10">
          <Phone className="w-5 h-5 text-gray-600" />
          <span>+7 (953) 399-69-51</span>
          <a
            href="https://t.me/username"
            target="_blank"
            rel="noreferrer"
            className="opacity-80 hover:opacity-100"
          >
            <Send className="w-5 h-5  text-sky-600" />
          </a>
          <a
            href="https://wa.me/79533996951"
            target="_blank"
            rel="noreferrer"
            className="opacity-80 hover:opacity-100"
          >
            <MessageCircle className="w-5 h-5 text-green-600" />
          </a>
        </div>

        {/* --- Логотип --- */}
        <div className="flex-1">
          <Link to="/" className="text-2xl font-semibold tracking-wide">
            <img src="/public/Logotype.png" alt="Logo" />
          </Link>
        </div>

        <div className="flex items-center gap-6">
          {/* Избранное */}
          <Link
            to="/favorites"
            className="relative"
            title={t("header.favorites")}
          >
            <Heart className="w-5 h-5 text-pink-600" />
            {favorites.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs px-1 rounded bg-black text-white">
                {favorites.length}
              </span>
            )}
          </Link>

          {/* Корзина */}
          <Link to="/cart" className="relative" title={t("header.cart")}>
            <ShoppingBag className="w-5 h-5 text-green-600" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 text-xs px-1 rounded bg-black text-white">
                {cart.length}
              </span>
            )}
          </Link>

          {/* Аккаунт */}
          <HeaderAccount />

          {/* Языки */}
          <button
            onClick={switchLang}
            className="ml-2 px-2 py-3 rounded bg-gray-200 hover:bg-red-300"
          >
            {i18n.language === "ru" ? "EN" : "RU"}
          </button>
        </div>
      </div>

      {/* --- Меню под шапкой --- */}
      <nav className="bg-white mt-4 mb-4">
        <div className="container flex justify-center gap-20 py-3 text-gray-600 font-medium">
          <Link to="/" className="hover:text-black">
            {t("nav.home")}
          </Link>
          <Link to="/catalog" className="hover:text-black">
            {t("nav.catalog")}
          </Link>
          <Link to="/artists" className="hover:text-black">
            {t("nav.artists")}
          </Link>
          <Link to="/news" className="hover:text-black">
            {t("nav.news")}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;

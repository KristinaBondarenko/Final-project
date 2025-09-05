import React from "react";
import { useTranslation } from "react-i18next"; // Хук i18n для локализации текста.

export default function Footer() {
  // Использование хука useTranslation для интернационализации.
  const { t } = useTranslation(); // Получаем объект перевода для текущего языка.

  return (
    <footer className="mt-10 bg-white mb-6">
      {" "}
      {/* Нижняя панель сайта */}
      <div className="container py-8 grid md:grid-cols-3 gap-6">
        {" "}
        {/* Первая колонка: Навигационные ссылки */}
        <div>
          <div className="font-semibold mb-2 mt-4"></div>{" "}
          <ul className="text-sm space-y-1">
            {" "}
            {/* Список ссылок меню */}
            <li>
              <a href="/">{t("nav.home")}</a>
            </li>{" "}
            <li>
              <a href="/catalog">{t("nav.catalog")}</a>
            </li>{" "}
            <li>
              <a href="/artists">{t("nav.artists")}</a>
            </li>{" "}
            <li>
              <a href="/news">{t("nav.news")}</a>
            </li>{" "}
          </ul>
        </div>
        {/* Вторая колонка: Контактная информация */}
        <div>
          <div className="font-semibold mb-2 mt-4">{t("home.contacts")}</div>{" "}
          <div className="text-sm">Email: hello@art.gallery</div>{" "}
          <div className="text-sm">+7 (999) 123-45-67</div> {/* Телефон */}
          <div className="text-sm">
            Адрес: г.Москва, Арт‑пространство, 1а
          </div>{" "}
        </div>
        {/* Третья колонка: Форма подписки на рассылку */}
        <div>
          <div className="font-semibold mb-2 mt-4">
            {t("footer.subscribeTitle")}
          </div>{" "}
          {/* Простая форма подписки на события submit */}
          <form
            onSubmit={(e) => {
              // Обработка отправки формы.
              e.preventDefault(); // Блокируем перезагрузку страницы.
              alert(t("footer.subscribed") || "Спасибо за подписку!"); // Уведомляем пользователя о подписке.
            }}
            className="flex gap-2"
          >
            <input
              required // Обязательное поле.
              type="email" // Тип поля email.
              placeholder={t("footer.email")} // Местозаполнитель для ввода email.
              className="px-3 py-2 rounded-xl border border-gray-300 flex-1" // Оформление input
            />
            <button className="btn-primary" type="submit">
              {t("footer.subscribe")}
            </button>{" "}
            {/* Кнопка отправки формы */}
          </form>
        </div>
      </div>
    </footer>
  );
}

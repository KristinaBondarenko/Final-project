import React, { useState } from "react";
import Modal from "./Modal";
import useAuthStore from "../store/useAuthStore";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function AuthModal({ open, onClose }) {
  const { login, register, loginWithGoogle, loginWithGithub } = useAuthStore();

  // Локальные состояния компонента.
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
    remember: false,
  });
  // Форма для входа.
  const [regOpen, setRegOpen] = useState(false); // Флаг отображения формы регистрации.
  const [regForm, setRegForm] = useState({
    email: "",
    password: "",
    confirm: "",
  });
  // Форма для регистрации
  const [error, setError] = useState(""); // Сообщение об ошибке.

  // Обработчик отправки формы входа.
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Очищаем предыдущее сообщение об ошибке.
    try {
      await login(loginForm);
      onClose(false);
    } catch (err) {
      setError(err.message || "Ошибка входа");
    }
  };

  // Обработчик отправки формы регистрации.
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (regForm.password !== regForm.confirm)
      return setError("Пароли не совпадают");
    // Проверяем совпадение паролей
    try {
      await register({ email: regForm.email, password: regForm.password });
      // Выполняем регистрацию с использованием метода register из хранилища
      onClose(false);
    } catch (err) {
      setError(err.message || "Ошибка регистрации");
    }
  };

  // Обработчик входа через Google.
  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  // Обработчик входа через GitHub.
  const handleGithubLogin = async () => {
    try {
      await loginWithGithub();
      onClose();
    } catch (err) {
      alert(err.message);
    }
  };

  // Рендеринг компонента.
  return (
    <Modal open={open} onClose={onClose}>
      {/* Модальное окно открывается, если prop 'open' установлен в true */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Контейнер с двумя колонками на больших экранах */}
        {/* Колонка "Войти" */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
            Войти
          </h2>{" "}
          {/* Заголовок формы входа */}
          <form onSubmit={handleLogin} className="space-y-3">
            {/* Форма входа */}
            <div>
              <label className="block text-sm mb-1">Логин (email):</label>
              {/* Поле ввода email */}
              <input
                className="w-full border rounded-md p-2"
                type="email"
                value={loginForm.email}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, email: e.target.value })
                }
                required
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Пароль:</label>
              {/* Поле ввода пароля */}
              <input
                className="w-full border rounded-md p-2"
                type="password"
                value={loginForm.password}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, password: e.target.value })
                }
                required
              />
            </div>
            <label className="inline-flex items-center gap-2 text-sm">
              {/* Чекбокс "Запомнить меня" */}
              <input
                type="checkbox"
                checked={loginForm.remember}
                onChange={(e) =>
                  setLoginForm({ ...loginForm, remember: e.target.checked })
                }
              />
              Запомнить меня
            </label>
            <button
              type="submit"
              className="w-full bg-neutral-800 text-white rounded-md py-2"
            >
              Войти
            </button>
            <div className="text-sm text-gray-500">
              <button
                type="button"
                className="underline"
                onClick={() => setRegOpen(true)}
              >
                Регистрация
              </button>{" "}
              ·{" "}
              <a className="underline" href="#">
                Забыли свой пароль?
              </a>
            </div>
          </form>

          {/* Соцсети */}
          <div className="mt-4 space-y-2">
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-2 w-full border py-2 rounded-md"
            >
              <FcGoogle className="text-xl" /> Войти через Google
            </button>
            <button
              onClick={handleGithubLogin}
              className="flex items-center justify-center gap-2 w-full border py-2 rounded-md"
            >
              <FaGithub className="text-xl" /> Войти через GitHub
            </button>
          </div>
        </div>

        {/* Колонка "Зарегистрироваться" */}
        <div className="flex flex-col justify-between">
          {!regOpen /* Если форма регистрации закрыта */ ? (
            <>
              {/* Информация о преимуществах регистрации */}
              <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
                Зарегистрироваться
              </h2>
              <ul className="space-y-2 text-sm text-gray-600 mb-2">
                <li>Посмотреть историю заказов</li>
                <li>Быстрая покупка</li>
                <li>Обмен и возврат товаров</li>
              </ul>
              <button
                onClick={() => setRegOpen(true)}
                className="w-full bg-neutral-800 text-white rounded-md py-2"
              >
                Продолжить
              </button>
            </>
          ) : (
            /* Если форма регистрации открыта */
            <form onSubmit={handleRegister} className="space-y-3">
              {" "}
              {/* Форма регистрации */}
              <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
                Регистрация
              </h2>
              <div>
                <label className="block text-sm mb-1">Email:</label>{" "}
                {/* Поле ввода email */}
                <input
                  className="w-full border rounded-md p-2"
                  type="email"
                  value={regForm.email}
                  onChange={(e) =>
                    setRegForm({ ...regForm, email: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Пароль:</label>
                {/* Поле ввода пароля */}
                <input
                  className="w-full border rounded-md p-2"
                  type="password"
                  value={regForm.password}
                  onChange={(e) =>
                    setRegForm({ ...regForm, password: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Повторите пароль:</label>{" "}
                {/* Поле подтверждения пароля */}
                <input
                  className="w-full border rounded-md p-2"
                  type="password"
                  value={regForm.confirm}
                  onChange={(e) =>
                    setRegForm({ ...regForm, confirm: e.target.value })
                  }
                  required
                />
              </div>
              <div className="flex gap-2">
                {/* Кнопки навигации и завершения регистрации */}
                <button
                  type="button"
                  className="flex-1 border rounded-md py-2"
                  onClick={() => setRegOpen(false)}
                >
                  Назад
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-neutral-800 text-white rounded-md py-2"
                >
                  Создать аккаунт
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
      {/* Отображение сообщения об ошибке */}
    </Modal>
  );
}

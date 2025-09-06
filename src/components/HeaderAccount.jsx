import React, { useState } from "react";
import AuthModal from "./AuthModal"; // Импортируем модальное окно авторизации.
import useAuthStore from "../store/useAuthStore";
import { Link } from "react-router-dom"; // Импортируем Link для навигации.

// Компонент UserIcon для отображения иконки пользователя.
function UserIcon(props) {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...props}>
      <path fill="currentColor" d="M12 12c2.76 0 5-2.69 5-6s-2.24-6-5-6-5 2.69-5 6 2.24 6 5 6zm0 2c-5.33 0-10 2.24-10 5v3h20v-3c0-2.76-4.67-5-10-5z"/>
    </svg>
  );
}

// Компонент HeaderAccount для отображения информации о пользователе.
export default function HeaderAccount() {
  // useState для отслеживания состояния модального окна
  const [open, setOpen] = useState(false);
  const { user, logout, isAdmin } = useAuthStore();

  return (
    <div className="flex items-center gap-3"> 
      {user ? ( // Если пользователь авторизован.
        <>
          <span className="text-sm"></span>
          {isAdmin() && ( // Если пользователь администратор
            <Link to="/admin" className="text-sm underline">Админка</Link> // Ссылка на админку.
          )}
          <button className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition duration-300" onClick={() => logout()}>Выйти</button> 
        </>
      ) : ( // Если пользователь не авторизован
        <button
          onClick={() => setOpen(true)} // Открытие модального окна авторизации.
          className="p-2 rounded-full hover:bg-gray-100" 
          aria-label="Аккаунт"
        >
          <UserIcon className="w-6 h-6" /> 
        </button>
      )}

      <AuthModal open={open} onClose={setOpen} /> {/* Модальное окно авторизации */}
    </div>
  );
}
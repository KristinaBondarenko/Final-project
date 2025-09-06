import React from "react";
import useAuthStore from "../store/useAuthStore";
import { Navigate } from "react-router-dom";

export default function AdminPage() {
  const { user, isAdmin } = useAuthStore();

  if (!user) return <Navigate to="/" />; // если не вошёл.
  if (!isAdmin()) return <p className="p-10">⛔ Доступ запрещён</p>; // если не админ.

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>
      <p className="mb-4">Добро пожаловать, {user.email}!</p>
      <ul className="list-disc pl-6 space-y-2">
        <li>Управление пользователями</li>
        <li>CRUD для картин</li>
        <li>CRUD для новостей</li>
        <li>Просмотр заказов</li>
      </ul>
    </div>
  );
}



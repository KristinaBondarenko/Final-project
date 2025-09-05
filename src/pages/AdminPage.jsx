import React from "react";
import useGalleryStore from "../store/useGalleryStore";
import { Navigate } from "react-router-dom";

export default function AdminPage() {
  const { user } = useGalleryStore();
  if (!user || user.role !== "admin") return <Navigate to="/" replace />;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>
      <p className="text-gray-600">Только для роли admin. Здесь потом сделаем CRUD по товарам.</p>
    </div>
  );
}

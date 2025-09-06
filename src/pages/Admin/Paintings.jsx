import React, { useState, useEffect } from "react";
import api from "../../services/api";

export default function Paintings() {
  const [paintings, setPaintings] = useState([]);
  const [editing, setEditing] = useState(null); // null = новая картина, иначе id картины
  const [form, setForm] = useState({ title: "", author: "", price: "" });

  // Загружаем список картин
  useEffect(() => {
    fetchPaintings();
  }, []);

  async function fetchPaintings() {
    try {
      const res = await api.get("/paintings");
      setPaintings(res.data);
    } catch (err) {
      console.error("Ошибка загрузки картин:", err);
    }
  }

  // Обработка изменений в форме
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  // Добавление или редактирование картины
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      if (editing) {
        // редактирование
        await api.put(`/paintings/${editing}`, form);
      } else {
        // добавление
        await api.post("/paintings", form);
      }
      setForm({ title: "", author: "", price: "" });
      setEditing(null);
      fetchPaintings();
    } catch (err) {
      console.error("Ошибка сохранения картины:", err);
    }
  }

  // Удаление картины
  async function handleDelete(id) {
    if (!window.confirm("Удалить эту картину?")) return;
    try {
      await api.delete(`/paintings/${id}`);
      fetchPaintings();
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  }

  // Заполнить форму для редактирования
  function handleEdit(painting) {
    setEditing(painting.id);
    setForm({
      title: painting.title || "",
      author: painting.author || "",
      price: painting.price || "",
    });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Управление картинами</h1>

      {/* Форма */}
      <form onSubmit={handleSubmit} className="mb-6 space-y-2">
        <input
          type="text"
          name="title"
          placeholder="Название"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Автор"
          value={form.author}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Цена"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {editing ? "Сохранить изменения" : "Добавить картину"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => {
              setEditing(null);
              setForm({ title: "", author: "", price: "" });
            }}
            className="ml-2 px-4 py-2 bg-gray-400 text-white rounded"
          >
            Отмена
          </button>
        )}
      </form>

      {/* Таблица картин */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Название</th>
            <th className="border p-2">Автор</th>
            <th className="border p-2">Цена</th>
            <th className="border p-2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {paintings.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.title}</td>
              <td className="border p-2">{p.author}</td>
              <td className="border p-2">{p.price}</td>
              <td className="border p-2 space-x-2">
                <button
                  onClick={() => handleEdit(p)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded"
                >
                  Редактировать
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded"
                >
                  Удалить
                </button>
              </td>
            </tr>
          ))}
          {paintings.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center p-4">
                Нет картин
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

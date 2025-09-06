import { useState } from "react";

export default function PaintingForm({ painting, onSave, onCancel }) {
  // Используем useState для хранения состояния формы.
  // Если передается объект painting, используем его.
  const [form, setForm] = useState(painting);

  const handleChange = (e) => {
    // Создаем новый объект form, сохраняя старые значения, меняя значение текущего поля.
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Функция-обработчик отправки форрмы.
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
  };

  // Возвращаем разметку формы.
  return (
    <form className="border p-4 my-4 bg-gray-50" onSubmit={handleSubmit}>
      {/* Поле ввода заголовка картины */}
      <input
        type="text"
        name="title"
        placeholder="Title"
        value={form.title || ""}
        onChange={handleChange}
        className="border p-2 w-full mb-2" // это стили TailwindCSS
      />
      {/* Поле ввода автора картины */}
      <input
        type="text"
        name="artist"
        placeholder="Artist"
        value={form.artist || ""}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      {/* Кнопка для сохранения формы */}
      <button
        className="bg-green-600 text-white px-4 py-2 rounded mr-2"
        type="submit"
      >
        Save
      </button>
      {/* Кнопка для отмены формы */}
      <button
        className="bg-gray-400 text-white px-4 py-2 rounded"
        type="button"
        onClick={onCancel}
      >
        Cancel
      </button>
    </form>
  );
}

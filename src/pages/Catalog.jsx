import React, { useEffect, useState } from "react";
import api from "../services/api";
import PaginationControls from "../components/PaginationControls";

export default function Catalog() {
  const [artworks, setArtworks] = useState([]);
  const [sortKey, setSortKey] = useState("price");
  const [order, setOrder] = useState("desc");
  const [filterOpen, setFilterOpen] = useState(false);
  const [buyItem, setBuyItem] = useState(null);
  const [previewItem, setPreviewItem] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [form, setForm] = useState({
    priceMin: "",
    priceMax: "",
    style: "",
    technique: "",
    query: "",
  });

  const styles = ["Пейзаж", "Портрет", "Абстракция", "Натюрморт", "Минимализм"];
  const techniques = ["Масло", "Акрил", "Гуашь", "Цифровая", "Акварель"];

  useEffect(() => {
    api.get("/images").then((res) => {
      setArtworks(res.data);
    });
  }, []);

  // Фильтрация товаров.
  const filteredItems = artworks.filter((item) => {
    const matchQuery = item.title
      ?.toLowerCase()
      .includes(form.query.toLowerCase());
    const matchStyle = form.style ? item.style === form.style : true;
    const matchTechnique = form.technique
      ? item.technique === form.technique
      : true;
    const matchPriceMin = form.priceMin ? item.price >= +form.priceMin : true;
    const matchPriceMax = form.priceMax ? item.price <= +form.priceMax : true;

    return (
      matchQuery && matchStyle && matchTechnique && matchPriceMin && matchPriceMax
    );
  });

  // Сортировка товаров.
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortKey === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    }
    if (sortKey === "title") {
      return order === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    return 0;
  });

  // Пагинация.
  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  const paginated = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container py-8">
      {/* Фильтр и сортировка */}
      <div className="flex justify-between items-center mb-6 mt-10 ">
        <button className="btn" onClick={() => setFilterOpen((o) => !o)}>
          {filterOpen ? "Скрыть фильтр" : "Показать фильтр"}
        </button>
        <select
          className="border rounded px-2 py-1"
          value={`${sortKey}_${order}`}
          onChange={(e) => {
            const [k, o] = e.target.value.split("_");
            setSortKey(k);
            setOrder(o);
          }}
        >
          <option value="price_desc">Цена ↓</option>
          <option value="price_asc">Цена ↑</option>
          <option value="title_asc">Название A–Я</option>
          <option value="title_desc">Название Я–А</option>
        </select>
      </div>

      {/* Панель фильтров */}
      {filterOpen && (
        <div className="p-4 border rounded mb-4 grid grid-cols-2 gap-4 mt-6">
          <input
            type="text"
            placeholder="Поиск"
            className="border p-2 rounded"
            value={form.query}
            onChange={(e) => setForm({ ...form, query: e.target.value })}
          />
          <input
            type="number"
            placeholder="Цена от"
            className="border p-2 rounded"
            value={form.priceMin}
            onChange={(e) => setForm({ ...form, priceMin: e.target.value })}
          />
          <input
            type="number"
            placeholder="Цена до"
            className="border p-2 rounded"
            value={form.priceMax}
            onChange={(e) => setForm({ ...form, priceMax: e.target.value })}
          />
          <select
            className="border p-2 rounded"
            value={form.style}
            onChange={(e) => setForm({ ...form, style: e.target.value })}
          >
            <option value="">Все стили</option>
            {styles.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            className="border p-2 rounded"
            value={form.technique}
            onChange={(e) => setForm({ ...form, technique: e.target.value })}
          >
            <option value="">Все техники</option>
            {techniques.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Сетка карточек */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {paginated.map((item) => (
          <div
            key={item.id}
            className="relative group overflow-hidden rounded-xl shadow hover:shadow-lg transition cursor-pointer"
            onClick={() => setPreviewItem(item)}
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black/60 text-white opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
              <div className="font-semibold">{item.title}</div>
              {item.size && <div className="text-sm">{item.size}</div>}
              <div className="text-sm">{item.author}</div>
              <div className="font-bold mt-1">
                {(item.price || 0).toLocaleString("ru-RU")} руб
              </div>
              <button
                className="btn-primary mt-2"
                onClick={(e) => {
                  e.stopPropagation(); // не открывть превью.
                  setBuyItem(item);
                }}
              >
                Купить
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Пагинация */}
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Модалка увеличенной картинки */}
      {previewItem && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setPreviewItem(null)}
        >
          <img
            src={previewItem.url}
            alt={previewItem.title}
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* Модалка покупки */}
      {buyItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-96 relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setBuyItem(null)}
            >
              ✕
            </button>
            <div className="text-center mb-4">
              <img
                src="/public/Logotype.png"
                alt="Логотип"
                className="h-12 mx-auto mb-2"
              />
              <h2 className="text-xl font-bold">Купить в один клик</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const name = e.target.name.value;
                const phone = e.target.phone.value;
                console.log("Отправка заказа:", { item: buyItem, name, phone });
                alert("Заявка отправлена!");
                setBuyItem(null);
              }}
              className="flex flex-col gap-3"
            >
              <input
                name="name"
                type="text"
                placeholder="Ваше имя"
                required
                className="border p-2 rounded"
              />
              <input
                name="phone"
                type="tel"
                placeholder="Ваш телефон"
                required
                className="border p-2 rounded"
              />
              <button type="submit" className="btn-primary">
                Отправить
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

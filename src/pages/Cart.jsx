import React from "react";
import useGalleryStore from "../store/useGalleryStore";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Cart() {
  const cart = useGalleryStore((s) => s.cart);
  const remove = useGalleryStore((s) => s.removeFromCart);
  const total = cart.reduce((s, i) => s + (i.price || 0), 0);
  const { t } = useTranslation();

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-semibold mt-4 mb-4">{t("header.cart")}</h1>
      <div className="space-y-3">
        {cart.map((it) => (
          <div key={it.id} className="card p-3 flex items-center gap-3">
            <img src={it.url} className="w-24 h-16 object-cover rounded" />
            <div className="flex-1">
              <div className="font-semibold">{it.title}</div>
              <div className="text-sm text-gray-600">{it.author}</div>
            </div>
            <div className="w-28 text-right">{(it.price || 0).toLocaleString("ru-RU")} руб</div>
            <button className="btn" onClick={() => remove(it.id)}>
              {t("Удалить") || "catalog.remove"}
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg">
          {t("Итого") || "cart.total"}: <b>{total.toLocaleString("ru-RU")} руб</b>
        </div>
        <Link to="/checkout" className="btn-primary">{t("Оформить заказ") || "cart.checkout"}</Link>
      </div>
    </div>
  );
}

import React from "react";
import { getImages } from "../services/images";
import { useNavigate } from "react-router-dom";

function Slider({ items }) {
  const [index, setIndex] = React.useState(0);
  const nav = useNavigate(); // Получаем функцию для навигаци.
  const next = () => setIndex((index + 1) % items.length); // Функция для перехода к следующему слайду.
  const prev = () => setIndex((index - 1 + items.length) % items.length); // Функция для перехода к предыдущему слайду.
  const cur = items[index]; // Текущий слайд.

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <img
          src={cur.url}
          alt={cur.title}
          className="w-full h-96 object-cover cursor-pointer"
          onClick={() => nav("/art/" + cur.id)} // Переход к детальной странице картины.
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/50 text-white px-4 py-2 rounded-2xl text-center">
            <div className="text-lg font-semibold">{cur.title}</div>
            <div className="text-sm opacity-90">{cur.author}</div>
          </div>
        </div>
      </div>
      <button
        className="btn absolute left-2 top-1/2 -translate-y-1/2"
        onClick={prev}
      >
        ‹
      </button>
      <button
        className="btn absolute right-2 top-1/2 -translate-y-1/2"
        onClick={next}
      >
        ›
      </button>
      <div className="flex justify-center gap-2 mt-2">
        {items.map(
          (
            _,
            i // Отображаем точки для слайдов.
          ) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={
                "h-2 w-2 rounded-full " +
                (i === index ? "bg-black" : "bg-gray-300")
              }
            ></button>
          )
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [featured, setFeatured] = React.useState([]); // Состояние для хранения рекомендованных картин.
  React.useEffect(() => {
    getImages({ _limit: 5, featured: true }).then(({ data }) =>
      setFeatured(data)
    );
  }, []);
  return (
    <div className="container py-4 space-y-10">
      {featured.length > 0 && ( // Если есть рекмендованные картины.
        <section>
          <h2 className="text-xl font-semibold mb-6 mt-10">Рекомендации</h2>
          <Slider items={featured} />
        </section>
      )}

      <section className="grid md:grid-cols-3 gap-4 items-start">
        <div className="md:col-span-2">
          <h1 className="text-2xl font-semibold mb-3">О нас</h1>
          <p className="text-gray-700">
            Art Gallery — это галерея современного искусства, основанная в 2023
            году в Москве. Мы являемся не только пространством для выставок, но
            и онлайн-площадкой, где можно приобрести произведения искусства от
            известных и перспективных художников. Мы рады приветствовать вас как
            в нашей галерее в Москве, так и на нашем сайте, где вы можете
            ознакомиться с нашими работами и сделать покупку в любое удобное для
            вас время.
          </p>
        </div>
        <div>
          {/* <iframe
            width="390"
            height="240"
            src="https://rutube.ru/play/embed/056220ad1b83c13fa3f1a22dde6f953b"
            frameBorder="0"
            allow="clipboard-write; autoplay"
            allowFullScreen
          ></iframe> */}
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold mb-6 mt-6">Отзывы</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              name: "Славик",
              text: "Отличный сервис!",
              img: "https://i.pravatar.cc/100?img=1",
            },
            {
              name: "Денис",
              text: "Нашёл идеальную работу за небольшую стоимость.",
              img: "https://i.pravatar.cc/100?img=12",
            },
            {
              name: "Мария",
              text: "Выбор не совсем большой, но работы художников уникальные и интересные.",
              img: "https://i.pravatar.cc/100?img=5",
            },
          ].map((r, i) => (
            <div key={i} className="card p-4 flex items-center gap-3 mb-10">
              <img
                src={r.img}
                alt={r.name}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold">{r.name}</div>
                <div className="text-sm text-gray-600">{r.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

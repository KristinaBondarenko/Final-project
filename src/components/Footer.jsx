import React from 'react'
export default function Footer(){
  return (<footer className="border-t mt-10 bg-white">
    <div className="container py-8 grid md:grid-cols-3 gap-6">
      <div>
        <div className="font-semibold mb-2">Навигация</div>
        <ul className="text-sm space-y-1">
          <li><a href="/">Главная</a></li>
          <li><a href="/catalog">Каталог</a></li>
          <li><a href="/artists">Художники</a></li>
          <li><a href="/news">Новости</a></li>
        </ul>
      </div>
      <div>
        <div className="font-semibold mb-2">Контакты</div>
        <div className="text-sm">Email: hello@art.gallery</div>
        <div className="text-sm">Тел: +7 (999) 123‑45‑67</div>
      </div>
      <div>
        <div className="font-semibold mb-2">Подписка</div>
        <form onSubmit={(e)=>{e.preventDefault(); alert('Спасибо за подписку!')}} className="flex gap-2">
          <input required type="email" placeholder="Ваш email" className="px-3 py-2 rounded-xl border border-gray-300 flex-1"/>
          <button className="btn-primary" type="submit">Подписаться</button>
        </form>
      </div>
    </div>
  </footer>)
}
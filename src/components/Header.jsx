import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingBag, User, Send, Phone, MessageCircle } from 'lucide-react'
import useGalleryStore from '../store/useGalleryStore'

export default function Header(){
  const favorites = useGalleryStore(s=>s.favorites)
  const cart = useGalleryStore(s=>s.cart)
  return (<>
    <header className="border-b bg-white shadow-sm">
      <div className="container py-2 flex items-center justify-between text-sm">
        <div className="flex items-center gap-3 text-gray-700">
          <Phone className="w-4 h-4"/><span>+7 (999) 123‑45‑67</span>
          <a href="https://t.me/username" target="_blank" rel="noreferrer" title="Telegram" className="opacity-80 hover:opacity-100"><Send className="w-4 h-4"/></a>
          <a href="https://wa.me/79991234567" target="_blank" rel="noreferrer" title="WhatsApp" className="opacity-80 hover:opacity-100"><MessageCircle className="w-4 h-4 text-green-600"/></a>
        </div>
        <div className="flex-1 text-center">
          <Link to="/" className="text-2xl font-semibold tracking-wide">Art Gallery</Link>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/favorites" className="relative" title="Избранное">
            <Heart className="w-5 h-5"/>
            {favorites.length>0 && <span className="absolute -top-2 -right-2 text-xs px-1 rounded bg-black text-white">{favorites.length}</span>}
          </Link>
          <Link to="/cart" className="relative" title="Корзина">
            <ShoppingBag className="w-5 h-5"/>
            {cart.length>0 && <span className="absolute -top-2 -right-2 text-xs px-1 rounded bg-black text-white">{cart.length}</span>}
          </Link>
          <Link to="#" title="Аккаунт"><User className="w-5 h-5"/></Link>
        </div>
      </div>
    </header>
    <div className="bg-white border-b">
      <nav className="container py-3 flex items-center gap-6 text-sm">
        <Link to="/" className="hover:underline">Главная</Link>
        <Link to="/catalog" className="hover:underline">Каталог</Link>
        <Link to="/artists" className="hover:underline">Художники</Link>
        <Link to="/news" className="hover:underline">Новости</Link>
        <div className="flex-1"></div>
        <SearchBar/>
      </nav>
    </div>
  </>)
}

function SearchBar(){
  const [v,setV]=React.useState('')
  const setQuery = useGalleryStore(s=>s.setQuery)
  const onSubmit=(e)=>{e.preventDefault(); setQuery(v)}
  return (<form onSubmit={onSubmit} className="flex items-center gap-2">
    <input value={v} onChange={e=>setV(e.target.value)} placeholder="Поиск..." className="px-3 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring"/>
    <button className="btn" type="submit">Искать</button>
  </form>)
}

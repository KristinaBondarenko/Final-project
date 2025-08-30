import React from 'react'
import { Heart, ShoppingBag } from 'lucide-react'
import useGalleryStore from '../store/useGalleryStore'
import { useNavigate } from 'react-router-dom'

export default function ArtCard({ item }){
  const { toggleFavorite, addToCart, favorites } = useGalleryStore()
  const fav = favorites.some(f=>f.id===item.id)
  const navigate = useNavigate()
  return (<div className="group">
    <div className="relative overflow-hidden rounded-lg bg-gray-100 cursor-pointer" onClick={()=>navigate('/art/'+item.id)}>
      <img src={item.url} alt={item.title} className="w-full h-64 object-cover"/>
      <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition" onClick={(e)=>e.stopPropagation()}>
        <button className="btn h-9 w-9 p-0 rounded-full" title="В избранное" onClick={()=>toggleFavorite(item)}>
          <Heart className={'w-4 h-4 '+(fav?'text-red-500 fill-red-500':'')}/>
        </button>
        <button className="btn h-9 w-9 p-0 rounded-full" title="В корзину" onClick={()=>addToCart(item)}>
          <ShoppingBag className="w-4 h-4"/>
        </button>
      </div>
    </div>
    <div className="mt-2">
      <div className="text-sm text-gray-700">{item.title}{item.size?`, ${item.size}`:''}</div>
      {item.author && <div className="text-sm underline underline-offset-2">{item.author}</div>}
      <div className="mt-1"><span className="text-sm text-gray-700">Цена: </span><span className="font-semibold">{(item.price??0).toLocaleString('ru-RU')} руб</span></div>
    </div>
  </div>)
}
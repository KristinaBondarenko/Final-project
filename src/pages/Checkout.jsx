import React from 'react'
import useGalleryStore from '../store/useGalleryStore'
import { createOrder } from '../services/orders'
import { useNavigate } from 'react-router-dom'

export default function Checkout(){
  const cart=useGalleryStore(s=>s.cart)
  const clear=useGalleryStore(s=>s.clearCart)
  const [form,setForm]=React.useState({name:'',email:'',address:''})
  const nav=useNavigate()
  const total=cart.reduce((s,i)=>s+(i.price||0),0)
  const submit=async(e)=>{
    e.preventDefault()
    const order=await createOrder({form, cart, total, createdAt: new Date().toISOString()})
    // эмуляция оплаты:
    clear()
    nav('/payment?status=success&orderId='+order.id)
  }
  if(cart.length===0) return <div className='container py-8'>Корзина пуста</div>
  return (<div className='container py-8'>
    <h1 className='text-2xl font-semibold mb-4'>Оформление заказа</h1>
    <form onSubmit={submit} className='grid md:grid-cols-2 gap-4'>
      <input required placeholder='Имя' className='px-3 py-2 rounded-xl border' value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/>
      <input required type='email' placeholder='Email' className='px-3 py-2 rounded-xl border' value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/>
      <input required placeholder='Адрес' className='px-3 py-2 rounded-xl border md:col-span-2' value={form.address} onChange={e=>setForm({...form,address:e.target.value})}/>
      <div className='md:col-span-2 flex items-center justify-between mt-2'>
        <div>Итого к оплате: <b>{total.toLocaleString('ru-RU')} руб</b></div>
        <button className='btn-primary'>Оплатить</button>
      </div>
    </form>
  </div>)
}
import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'
export default function PaymentResult(){
  const [p]=useSearchParams()
  const ok=p.get('status')==='success'
  return (<div className='container py-16 text-center'>
    <h1 className={'text-3xl font-semibold '+(ok?'text-green-600':'text-red-600')}>{ok?'Оплата прошла успешно!':'Оплата не удалась'}</h1>
    <p className='text-gray-600 mt-2'>{ok?'Спасибо за покупку.':'Попробуйте ещё раз.'}</p>
    <div className='mt-6 flex justify-center gap-3'>
      <Link className='btn' to='/catalog'>Вернуться в каталог</Link>
      <Link className='btn' to='/'>На главную</Link>
    </div>
  </div>)
}
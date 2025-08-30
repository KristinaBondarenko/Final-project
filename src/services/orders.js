import api from './api'
export const createOrder= async(p)=> (await api.post('/orders',p)).data

import api from './api'
export const getImages= async(params={})=>{ const r=await api.get('/images',{params}); const total=parseInt(r.headers['x-total-count']||r.data.length,10); return {data:r.data,total} }
export const getImage= async(id)=> (await api.get('/images/'+id)).data

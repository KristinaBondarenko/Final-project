import { create } from 'zustand'

const persisted = (k, v) => {
  try { return JSON.parse(localStorage.getItem(k)) ?? v } catch { return v }
}
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)) } catch {} }

const useGalleryStore = create((set, get) => ({
  favorites: persisted('favorites', []),
  cart: persisted('cart', []),
  query: '',
  setQuery: (q) => set({ query: q }),
  toggleFavorite: (item) => set(state => {
    const exists = state.favorites.some(f => f.id === item.id)
    const next = exists ? state.favorites.filter(f => f.id !== item.id) : [...state.favorites, item]
    save('favorites', next)
    return { favorites: next }
  }),
  addToCart: (item) => set(state => {
    if (state.cart.some(c => c.id === item.id)) return {}
    const next = [...state.cart, item]
    save('cart', next)
    return { cart: next }
  }),
  removeFromCart: (id) => set(state => {
    const next = state.cart.filter(c => c.id !== id)
    save('cart', next)
    return { cart: next }
  }),
  clearCart: () => set(() => {
    save('cart', [])
    return { cart: [] }
  })
}))

export default useGalleryStore

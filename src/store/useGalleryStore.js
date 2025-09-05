import { create } from "zustand";

const persisted = (key, initial) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? initial;
  } catch {
    return initial;
  }
};

const useGalleryStore = create((set, get) => ({
  // artworks
  artworks: [],
  setArtworks: (data) => set({ artworks: data }),

  // artists
  artists: [],
  setArtists: (data) => set({ artists: data }),

  // поиск
  query: "",
  setQuery: (q) => set({ query: q }),

  // фильтры
  filters: {
    style: "",
    technique: "",
    priceMin: "",
    priceMax: "",
  },
  setFilters: (f) => set({ filters: f }),

  // отфильтрованные работы
  filteredArtworks: () => {
    const { artworks, query, filters } = get();
    return artworks.filter((a) => {
      const q = query.toLowerCase();
      if (q && !a.title.toLowerCase().includes(q)) return false;

      if (filters.style && a.style !== filters.style) return false;
      if (filters.technique && a.technique !== filters.technique) return false;
      if (filters.priceMin && a.price < Number(filters.priceMin)) return false;
      if (filters.priceMax && a.price > Number(filters.priceMax)) return false;

      return true;
    });
  },

  // пагинация
  currentPage: 1,
  itemsPerPage: 9,
  setPage: (page) => set({ currentPage: page }),

  // favorites + cart
  favorites: persisted("favorites", []),
  cart: persisted("cart", []),

  addFavorite: (item) =>
    set((state) => {
      const exists = state.favorites.some((f) => f.id === item.id);
      const next = exists ? state.favorites : [...state.favorites, item];
      localStorage.setItem("favorites", JSON.stringify(next));
      return { favorites: next };
    }),

  removeFavorite: (id) =>
    set((state) => {
      const next = state.favorites.filter((f) => f.id !== id);
      localStorage.setItem("favorites", JSON.stringify(next));
      return { favorites: next };
    }),

  toggleFavorite: (item) =>
    set((state) => {
      const exists = state.favorites.some((f) => f.id === item.id);
      const next = exists
        ? state.favorites.filter((f) => f.id !== item.id)
        : [...state.favorites, item];
      localStorage.setItem("favorites", JSON.stringify(next));
      return { favorites: next };
    }),

  addToCart: (item) =>
    set((state) => {
      const next = [...state.cart, item];
      localStorage.setItem("cart", JSON.stringify(next));
      return { cart: next };
    }),

  removeFromCart: (id) =>
    set((state) => {
      const next = state.cart.filter((f) => f.id !== id);
      localStorage.setItem("cart", JSON.stringify(next));
      return { cart: next };
    }),

  clearCart: () =>
    set(() => {
      localStorage.setItem("cart", JSON.stringify([]));
      return { cart: [] };
    }),
}));

export default useGalleryStore;



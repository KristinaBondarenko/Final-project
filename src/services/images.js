import api from "./api";

function buildParams({
  page = 1,
  limit = 1000,
  sort,
  order,
  author,
  featured,
} = {}) {
  const params = { _page: page, _limit: limit };
  if (sort) params._sort = sort;
  if (author) params.author = author;
  if (typeof featured === "boolean") params.featured = featured;
  return params; // без вложенных объектов.
}

// Получить список картин (постранично).
export async function getImages(options = {}) {
  const res = await api.get("/images", { params: buildParams(options) });
  return {
    data: res.data,
    total: parseInt(res.headers["x-total-count"] || res.data.length, 10),
  };
}

// Получить одну картину.
export async function getImage(id) {
  const res = await api.get(`/images/${id}`);
  return res.data;
}

// Получить ВСЕ картины (для группировки по авторам).
export async function getAllImages() {
  // JSON Server: большой лимит, чтобы забрать все.
  const res = await api.get("/images", { params: { _limit: 1000 } });
  return res.data;
}

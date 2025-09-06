import axios from "axios"; // Импортируем библиотеку axios для работы с API.

const API = "http://localhost:3000"; // URL API

export const getAllNews = async () => {
  const res = await axios.get(`${API}/news`); // Получаем все новости с сервра.
  return res.data; 
};

export const getNewsById = async (id) => {
  const res = await axios.get(`${API}/news/${id}`); // Получаем новость по id с сервера.
  return res.data; 
};

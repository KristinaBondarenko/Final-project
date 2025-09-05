import axios from "axios";

const API = "http://localhost:3000";

export const getAllNews = async () => {
  const res = await axios.get(`${API}/news`);
  return res.data;
};

export const getNewsById = async (id) => {
  const res = await axios.get(`${API}/news/${id}`);
  return res.data;
};

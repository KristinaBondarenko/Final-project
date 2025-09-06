import api from './api'; // Импортируем модуль api.

export const createOrder = async (p) => {
  return (await api.post('/orders', p)).data; // Отправляем POST-запрос на создание заказа и возвращаем даные.
};

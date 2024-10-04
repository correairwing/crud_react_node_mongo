import axios from 'axios';

const API_URL = 'http://localhost:5000/items';

export const getItems = () => axios.get(API_URL);
export const createItem = (newItem) => axios.post(API_URL, newItem);
export const updateItem = (id, updatedItem) => axios.put(`${API_URL}/${id}`, updatedItem);
export const deleteItem = (id) => axios.delete(`${API_URL}/${id}`);
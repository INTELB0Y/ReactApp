import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://67287885270bd0b975559810.mockapi.io/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});
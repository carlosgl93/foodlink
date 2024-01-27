import axios from 'axios';

console.log(import.meta.env.VITE_ENV);

const api = axios.create({
  baseURL:
    import.meta.env.VITE_ENV === 'production'
      ? import.meta.env.VITE_PROD_API_URL
      : 'http://localhost:3000',
  timeout: 15000,
});

export default api;

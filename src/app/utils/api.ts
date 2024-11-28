import axios from 'axios';

const api = axios.create({
    baseURL: 'https://todo-backend-ashen-seven.vercel.app',
    withCredentials: true,
});

export default api;
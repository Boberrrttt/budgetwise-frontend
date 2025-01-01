import axios from 'axios';
import { useRouter } from 'next/navigation';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    withCredentials: true, 
});

axiosInstance.interceptors.request.use((config) => {
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config;
        const router = useRouter();
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                router.replace('/login');
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
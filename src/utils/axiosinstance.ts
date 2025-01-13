import axios from 'axios';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
    withCredentials: true, 
});

axiosInstance.interceptors.request.use((config) => {
    if(config.url && !['/api/login', '/api/register'].includes(config.url)) {
        const accessToken = Cookies.get('accessToken') 
        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

    }

    return config;
}, (error) => {
    return Promise.reject(error);
});;

axiosInstance.interceptors.response.use(
    (response) => response, 
    async (error) => {
        const originalRequest = error.config;
        const router = useRouter();
        
        if (error.response) {
            if (error.response.status === 401 && !originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                    router.replace('/login');
                }
            }

            if (error.response.status === 404) {
                console.error('Resource not found:', error.response.data);
                router.replace('/login');
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
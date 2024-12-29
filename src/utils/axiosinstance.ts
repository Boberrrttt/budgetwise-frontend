import axios from 'axios';

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

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Attempt to refresh the token
                const refreshResponse = await axios.post(
                    'http://localhost:8000/api/refresh',
                    {},
                    { withCredentials: true }
                );
                console.log(refreshResponse.data);
                
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
            }
        }

        return Promise.reject(error);
    }
);


export default axiosInstance;
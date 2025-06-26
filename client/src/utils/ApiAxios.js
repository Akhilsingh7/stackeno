import axios from "axios";

const api = axios.create({
    baseURL: '/api/v1',
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;
        if(error.response?.status === 401
            && error.response?.data?.message === "Unauthorized - Access token expired"
            && !originalRequest.retry){
            originalRequest.retry = true;
            try{
                await axios.post("/api/v1/users/refresh-token", {}, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                });
                return api(originalRequest);
            }catch(error){
                window.location.href = "/login";
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default api;

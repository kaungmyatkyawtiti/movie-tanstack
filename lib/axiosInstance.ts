import axios from "axios";
import { useBoundStore } from "@/lib/useBondStore";
import { log } from "@/utils/logger";
import { apiUrl } from "@/utils/config";

console.log("axiosInstance.ts loaded!");

const axiosInstance = axios.create({
  baseURL: apiUrl,
  timeout: 10000
});

axiosInstance.interceptors.request.use(
  async (config) => {
    log('Axios interceptor enter');
    const { token } = useBoundStore.getState();
    log('Axios interceptor token', token);
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    config.headers['Content-Type'] = 'application/json';
    log('Headers ', config.headers);
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;

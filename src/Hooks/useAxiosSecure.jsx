import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const { user } = useAuth();

  useEffect(() => {
    const interceptor = axiosInstance.interceptors.request.use((config) => {
      if (user?.accessToken) {
        config.headers.Authorization = `Bearer ${user.accessToken}`;
      }
      return config;
    });

    // Cleanup to remove old interceptor
    return () => {
      axiosInstance.interceptors.request.eject(interceptor);
    };
  }, [user?.accessToken]);

  return axiosInstance;
};

export default useAxiosSecure;

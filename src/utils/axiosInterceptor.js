// src/utils/axiosInterceptor.js
import axios from "axios";

export const setupInterceptors = (refreshToken) => {
  axios.defaults.withCredentials = true;

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // If the error status is 401 and there is no originalRequest._retry flag
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Attempt to refresh the token
          await refreshToken();

          // Retry the original request
          return axios(originalRequest);
        } catch (refreshError) {
          // If token refresh fails, redirect to login or handle logout
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

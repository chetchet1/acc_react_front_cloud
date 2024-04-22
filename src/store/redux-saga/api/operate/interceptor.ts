// utils/api.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:9103',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.request.use(function (config) {
    // Do something before request is sent
    console.log("request start", config)
    return config;
  }, function (error) {
    console.log("request error", error)
    // Do something with request error
    return Promise.reject(error);
  });

  // Add a response interceptor
api.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log("get response", response)
    return response;
  }, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log("response error", error)
    return Promise.reject(error);
  });

// AxiosResponse와 AxiosError의 타입을 지정합니다.
export type ApiResponse<T> = AxiosResponse<T>;
export type ApiError = AxiosError;

export default api;

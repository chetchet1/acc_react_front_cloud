// utils/api.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: 'http://localhost:9103',
  headers: {
    'Content-Type': 'application/json'
  }
});

// AxiosResponse와 AxiosError의 타입을 지정합니다.
export type ApiResponse<T> = AxiosResponse<T>;
export type ApiError = AxiosError;

export default instance;

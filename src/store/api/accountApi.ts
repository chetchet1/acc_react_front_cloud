// utils/api.ts
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_ACC_URL}`,
  headers: {
    'Content-Type': 'application/json'
  }
});

// AxiosResponse와 AxiosError의 타입을 지정합니다.
export type ApiResponse<T> = AxiosResponse<T>;
export type ApiError = AxiosError;

export default instance;

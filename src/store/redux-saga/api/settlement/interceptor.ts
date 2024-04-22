/* eslint-disable prettier/prettier */
// utils/api.ts
/* axios 를 사용하여 API 요청을 수행하는데 사용되는 유틸리티 모듈로, AxiosInstance 를 생성하여
* baseURL 및 기본 헤더를 생성하고, 요청과 응답의 인터셉터를 추가하는 파일이다.
--> 요청에 대한 로깅이나 오류처리 같은 작업을 할 수 있음
*/
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: 'http://localhost:9103',
  headers: {
    'Content-Type': 'application/json'
  }
});
// axios.create() -> baseURL 및 기본 헤더를 생성


api.interceptors.request.use(function (config) {
    console.log("request start", config)
    return config;
  }, function (error) {
    console.log("request error", error)
    return Promise.reject(error);
  });
// 요청을 보내기 전에 요청 인터셉터를 추가하여 요청이 시작될 때마다 호출되며
// 요청 구성을 변경하거나 로깅할 수 있다.


api.interceptors.response.use(function (response) {
    // 서버에서 받은 응답 코드가 2xx 면 실행
    console.log("get response", response)
    return response;
  }, function (error) {
    // 서버에서 받은 응답 코드가 2xx 이외 모두 실행
    console.log("response error", error)
    return Promise.reject(error);
  });
// 응답 받기 전에 응답 인터셉터를 추가하여, 응답을 수신했을 때 호출되고 응답 데이터를 처리하거나 오류를 처리할 수 있다.

// AxiosResponse와 AxiosError의 타입을 지정한다.
export type ApiResponse<T> = AxiosResponse<T>;
export type ApiError = AxiosError;

export default api;
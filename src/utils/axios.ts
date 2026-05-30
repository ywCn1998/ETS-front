import axios, { AxiosError, } from 'axios';
import type { AxiosResponse } from 'axios';


import { showErrorMessage } from './alerts';



// export const API_BASEURL: string = import.meta.env.VITE_SOME_KEY || 'http://89.117.37.232:8001';
export const API_BASEURL: string = '';

const api = axios.create({ baseURL: API_BASEURL });

interface ErrorResponse {
  message: string;
  validationErrors: string[];
}

const handleErrorResponse = async (error: AxiosError<ErrorResponse>) => {
  if (error.status === 500) {
    showErrorMessage({ message: 'Server Error' });
  } else {
    if (error.response?.status === 401) {
      localStorage.clear();
      window.location.href = '/auth/login';
    }
    else if (error?.response?.data?.validationErrors && error?.response?.data?.validationErrors?.length > 0) {
      error?.response?.data?.validationErrors?.map((item) =>
        showErrorMessage({ message: item })
      )
    } else
      showErrorMessage({ message: String(error?.response?.data?.message) });
  }
  // toast.error(error?.response?.data?.message);
  return Promise.reject(error);
};

api.interceptors.response.use((response: AxiosResponse<Response>) => {
  // You can add any processing of the response here
  return response;
}, handleErrorResponse);

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Get the access token from local storage
    const accessToken = localStorage.getItem('token');


    // If an access token exists, add it to the request headers
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;

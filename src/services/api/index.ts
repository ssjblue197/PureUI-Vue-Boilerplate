import axios, {
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { useAuthStore } from '@/modules/auth/store';

//Import NProgress to show progress of api calling
import 'nprogress/nprogress.css';
import NProgress from 'nprogress';

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    const { access_token } = useAuthStore.getState();
    // Add token before request is sent
    const token = access_token;
    if (!!token && config.headers) {
      config.headers['access_token'] = token;
    }
    NProgress.start();
    return config;
  },
  function (error) {
    // Do something with request error
    NProgress.done();
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response: AxiosResponse): any {
    // Any status code that lie within the range of 2xx cause this function to trigger
    NProgress.done();
    return response;
  },
  async function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    //TODO: handle redirect to login page if response status code is 401 (Not authorized)
    NProgress.done();
    if (
      error.config.url == '/agent/refresh' &&
      error.response.status == 400 //Refresh token failed to refresh
    ) {
      await useAuthStore.getState().logout();
      window.location.replace('/sign-in');
    }
    return Promise.reject(error);
  },
);

export default axiosClient;

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
  // `timeout` specifies the number of milliseconds before the request times out.
  // If the request takes longer than `timeout`, the request will be aborted.
  timeout: 3000, //Set timeout
  // `responseType` indicates the type of data that the server will respond with
  // options are: 'arraybuffer', 'document', 'json', 'text', 'stream'
  //   browser only: 'blob'
  responseType: 'json', // default
  headers: {
    'Content-Type': 'application/json',
  },
  // `onUploadProgress` allows handling of progress events for uploads
  // browser only
  onUploadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },

  // `onDownloadProgress` allows handling of progress events for downloads
  // browser only
  onDownloadProgress: function (progressEvent) {
    // Do whatever you want with the native progress event
  },
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    const { token } = useAuthStore();
    // Add token before request is sent
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
      error.response.status == 401 //Refresh token failed to refresh
    ) {
      await useAuthStore().logout();
    }
    return Promise.reject(error);
  },
);

export default axiosClient;

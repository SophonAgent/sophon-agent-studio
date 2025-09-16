import axios, { AxiosRequestConfig } from 'axios';

type HttpMethod = 'get' | 'post' | 'put' | 'delete';

interface Response<T = any> {
  data?: T;
  message: string;
  logId?: string;
  status?: string;
  success?: boolean;
  timestamp?: number;
  code?: number;
}

const instance = axios.create({
  timeout: 120000,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  baseURL: '/api/v1/',
});

instance.defaults.adapter = undefined;

instance.interceptors.request.use(function (req) {
  // remove null or undefined parameters from the params object
  if (req.params) {
    req.params = Object.keys(req.params)
      .filter(k => req.params[k] !== null && req.params[k] !== undefined)
      .reduce((a, k) => ({ ...a, [k]: req.params[k] }), {});
  }
  return req;
});

// add a response interceptor
instance.interceptors.response.use(
  function (res: any) {
    if (res?.data.status === '500' || res?.data.status === '400') {
      throw res?.data?.message;
    }
    return res;
  },
  function (error) {
    return Promise.reject(error);
  },
);

const apiRequest = async <T>({
  method,
  url,
  params,
  config,
}: {
  method: HttpMethod;
  url: string;
  params?: Record<string, any>;
  config?: AxiosRequestConfig;
}): Promise<Response<T>> => {
  return new Promise<Response<T>>((resolve, reject) => {
    const api = ['get', 'delete'].includes(method)
      ? instance[method](url, config)
      : instance[method](url, params, config);
    api
      .then(res => {
        if (res.status !== 200) {
          throw res;
        }
        resolve(res.data);
      })
      .catch(e => {
        reject(e?.data?.message || e?.message || e);
      });
  });
};

const request = {
  get: <T>(url: string, config?: AxiosRequestConfig) => apiRequest<T>({ method: 'get', url, config }),
  post: <T>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig) =>
    apiRequest<T>({ method: 'post', url, params, config }),
  put: <T>(url: string, params?: Record<string, any>, config?: AxiosRequestConfig) =>
    apiRequest<T>({ method: 'put', url, params, config }),
  delete: <T>(url: string, config?: AxiosRequestConfig) => apiRequest<T>({ method: 'delete', url, config }),
};

export const MCP_TOOL_BASE_URL = '/mcp/wrapper/';

export default request;

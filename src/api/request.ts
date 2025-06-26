import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import axios from 'axios'

// 定义 RequestConfig 类型，兼容 Api.ts 的用法
export type RequestConfig = AxiosRequestConfig
enum RequestEnums {
  TIMEOUT = 20000,
  OVERDUE = 500, // 登录失效
  FAIL = 999, // 请求失败
  SUCCESS = 2000, // 请求成功
  SUCCESS_OTHER = 1000, // 请求成功
}
export const URL: string = import.meta.env.VITE_SERVICE_BASE_URL

const config = {
  // 默认地址
  baseURL: URL as string,
  // 设置超时时间
  timeout: RequestEnums.TIMEOUT as number,
}
// 创建 axios 实例
const instance = axios.create(config)

// 请求拦截器：自动携带 localStorage token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = config.headers || {}
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error: AxiosError) => Promise.reject(error),
)

// 响应拦截器：处理 401
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response
    if (data.code === RequestEnums.OVERDUE) {
      localStorage.clear()
      return Promise.reject(data)
    }
    if (data.code && data.code !== RequestEnums.SUCCESS && data.code !== RequestEnums.SUCCESS_OTHER) {
      // message.error(typeof data === "string" ? data : data.message);
      return Promise.reject(data)
    }
    return data
  },
  (error: AxiosError) => {
    const { response } = error
    if (response && response.status === 401) {
      // alert('登录已过期，请重新登录')
      // 可在此处添加跳转或清理逻辑
    }
    return Promise.reject(error)
  },
)

// 通用 request 方法
export function request<T = any>(
  url: string,
  config: RequestConfig = {},
): Promise<AxiosResponse<T>> {
  return instance.request<T>({ url, ...config })
}

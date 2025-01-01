import type { Login } from './login'
import http from '@/utils/http'

/**
 * 登录
 * @param data
 * @returns
 */
const login = async (data: Login.UserInfoDto) => http.post<Login.UserInfoVo>('/sysUser/login', data)

export { login }

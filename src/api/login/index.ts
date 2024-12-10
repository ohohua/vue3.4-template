import http from "@/utils/http";
import type { Login } from "./login";

/**
 * 登录
 * @param data
 * @returns
 */
const login = async (data: Login.UserInfoDto) => http.post<Login.UserInfoVo>("/sysUser/login", data);

export { login };

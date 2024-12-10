export interface MenuItem {
  index: string;
  title: string;
  icon: string;
  name: string;
  children?: MenuItem[];
}

// 定义错误码对象的类型
export type ErrorCodeType = {
  [key: number]: string;
};

/* 重置密码的表单类型 */
export interface ResetPassword {
  email: string;
  verificationCode: string;
  new_password: string;
  confirm_password: string;
}

export interface EmailLogin {
  email: string;
  verificationCode: string;
}

export interface PasswordLogin {
  username?: string;
  password?: string;
  remember: boolean;
}
export interface InfoLogin {
  unit?: number;
  job?: number;
  name?: string;
  password?: string;
  remember: boolean;
}

export interface RegisterUser {
  name: string;
  email: string;
  verificationCode: string;
  password: string;
  confirm_password: string;
  nick_name: string;
  sex: string;
  role: string;
}

export interface UserInfo {
  username: string;
}

// 用于用户管理获取用户的信息
export interface User {
  id: number;
  name: string;
  email: string;
  nick_name: string;
  sex: string;
  avatar: string;
  ip: string;
  role: string;
  created_at: string;
}

// 用户管理搜索表单
export interface SearchForm {
  name: string;
  email: string;
  role: string;
}

export interface PaginationForm {
  page: number;
  limit: number;
}

export interface ModifyUser {
  id: number;
  name: string;
  email: string;
  nick_name: string;
  sex: string;
  avatar: string;
}

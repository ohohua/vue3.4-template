import http from "@/utils/http";
import type { User } from "./user";

/**
 * 用户列表
 * @param data
 * @returns
 */
const getUserList = async (data: ListDto) => http.get<User.UserListVo>("/sysUser/getList", data);
/**
 * 管理员修改用户密码
 * @param data
 * @returns
 */
const updateUserPassword = async (data: User.UpdatePasswordDto) => http.get<Record<string, unknown>>("/sysUser/password/update", data);
/**
 * 用户excel导入
 * @returns
 */
const userExcelImport = async () => http.post<Record<string, unknown>>("/sysUser/excel/upload", {}, { headers: { "Content-Type": "multipart/form-data" } });
/**
 * 用户列表文件导出
 * @returns
 */
const userExcelExport = async (data: ListDto) => http.post<Record<string, unknown>>("/sysUser/excel/export", data);
/**
 * 编辑用户
 * @returns
 */
const userEdit = async (data: User.EditUserDto) => http.post<Record<string, unknown>>("/sysUser/edit", data);
/**
 * 新增用户
 * @returns
 */
const userAdd = async (data: User.EditUserDto) => http.post<Record<string, unknown>>("/sysUser/add", data);
/**
 * 用户导入模板下载
 * @returns
 */
const userTemplateDownload = async () => http.get<Record<string, unknown>>("/sysUser/template/download");
/**
 * 删除用户
 * @returns
 */
const userDelete = async (ids: string) => http.delete<Record<string, unknown>>("/sysUser/delete", { ids });

export { getUserList, updateUserPassword, userExcelImport, userExcelExport, userEdit, userAdd, userTemplateDownload, userDelete };

import http from "@/utils/http";
import type { Version } from "./version";

/**
 * 版本列表
 * @param data
 * @returns
 */
const getVersionList = async (data: ListDto) => http.get<Version.ListVo>("/sysSoftVersion/getList", data);
/**
 * 编辑版本
 * @param data
 * @returns
 */
const editVersion = async (data: Version.EditSoftVersionParams) => http.post<Record<string, unknown>>("/sysSoftVersion/edit", data);
/**
 * 新增版本
 * @param data
 * @returns
 */
const addVersion = async (data: Version.EditSoftVersionParams) => http.post<Record<string, unknown>>("/sysSoftVersion/add", data);
/**
 * 下载软件
 * @param id
 * @returns
 */
const downloadVersion = async (id: string) => http.download("/sysSoftVersion/downLoadFile", { id });
/**
 * 删除
 * @param id
 * @returns
 */
const deleteVersion = async (ids: string) => http.delete<Record<string, unknown>>("/sysSoftVersion/delete", { ids });

export { getVersionList, editVersion, addVersion, downloadVersion, deleteVersion };

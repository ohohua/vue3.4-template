import http from "@/utils/http";
import type { Config } from "./config";

/**
 * 编辑参数
 * @param data
 * @returns
 */
const editConfig = async (data: Config.EditParamsParams) => http.post<Record<string, unknown>>("/configManagement/update/configManagement", data);
/**
 * 查询参数
 * @param data
 * @returns
 */
const getConfig = async () => http.get<Record<string, any>>("/configManagement/get/configManagement");

export { getConfig, editConfig };

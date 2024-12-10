import http from "@/utils/http";
import type { Data } from "./Data.d.ts";

/**
 * 文件管理列表
 * @param data
 * @returns
 */
const getDataList = async (data: ListDto) => http.get<Data.ListVo>("/sysUser/getList", data);

export { getDataList };

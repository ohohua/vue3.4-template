import http from "@/utils/http";
import type { Doc } from "./doc.d.ts";

/**
 * 文件管理列表
 * @param data
 * @returns
 */
const getDocList = async (data: ListDto) => http.get<Doc.ListVo>("/sysUser/getList", data);

export { getDocList };

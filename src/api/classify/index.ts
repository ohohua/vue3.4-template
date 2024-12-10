import http from "@/utils/http";
import type { Classify } from "./classify.d.ts";

/**
 * 数据分类列表
 * @param data
 * @returns
 */
const getClassifyList = async (data: ListDto) => http.get<Classify.ListVo>("/sysUser/getList", data);

export { getClassifyList };

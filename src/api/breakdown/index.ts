import http from "@/utils/http";
import type { Breakdown } from "./breakdown.d.ts";

/**
 * 故障列表
 * @param data
 * @returns
 */
const getBreakdownList = async (data: ListDto) => http.get<Breakdown.ListVo>("/sysUser/getList", data);

export { getBreakdownList };

import http from "@/utils/http";
import type { Interface } from "./interface.js";

/**
 * 数据处理列表
 * @param data
 * @returns
 */
const getInterfaceList = async (data: ListDto) => http.get<Interface.ListVo>("/sysUser/getList", data);

export { getInterfaceList };

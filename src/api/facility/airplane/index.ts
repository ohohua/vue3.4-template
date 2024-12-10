import http from "@/utils/http";
import type { Airplane } from "./airplane";

/**
 * 飞机列表
 * @param data
 * @returns
 */
const getAirplaneList = async (data: ListDto) => http.get<Airplane.ListVo>("/sysPlane/getList", data);
/**
 * 删除飞机
 * @param data
 * @returns
 */
const deleteAirplane = async (ids: string) => http.get<Record<string, unknown>>("/sysPlane/getList", { ids });

export { getAirplaneList, deleteAirplane };

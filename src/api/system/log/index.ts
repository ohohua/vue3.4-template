import http from "@/utils/http";
import type { Log } from "./log";

/**
 * 【操作日志】列表查询
 * @param data
 * @returns
 */
const getLogList = async (data: ListDto) => http.post<Log.ListVo>("/sysLog/operate/list", data);

const editLog = async (data: Log.EditOperateLogParams) => http.post<Log.ListVo>("/sysLog/operate/edit", data);

export { getLogList, editLog };

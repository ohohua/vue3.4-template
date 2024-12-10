import http from "@/utils/http";
import type { TerminalLog } from "./terminalLog.d.ts";

/**
 * 数据终端日志列表
 * @param data
 * @returns
 */
const getTerminalLogList = async (data: ListDto) => http.get<TerminalLog.ListVo>("/sysUser/getList", data);

export { getTerminalLogList };

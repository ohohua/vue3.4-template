import http from "@/utils/http";
import type { Terminal } from "./terminal";

/**
 * 终端列表
 * @param data
 * @returns
 */
const getTerminalList = async (data: ListDto) => http.get<Terminal.ListVo>("/sysTerminal/getList", data);

export { getTerminalList };

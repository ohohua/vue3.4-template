import type { Terminal } from './terminal'
import http from '@/utils/http'

/**
 * 终端列表
 * @param data
 * @returns
 */
const getTerminalList = async (data: ListDto) => http.get<Terminal.ListVo>('/sysTerminal/getList', data)

export { getTerminalList }

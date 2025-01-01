import type { Log } from './log'
import http from '@/utils/http'

/**
 * 【操作日志】列表查询
 * @param data
 * @returns list
 */
const getLogList = async (data: ListDto) => http.post<Log.ListVo>('/sysLog/operate/list', data)

const editLog = async (data: Log.EditOperateLogParams) => http.post<Log.ListVo>('/sysLog/operate/edit', data)

export { editLog, getLogList }

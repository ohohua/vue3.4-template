import type { Breakdown } from './breakdown.d.ts'
import http from '@/utils/http'

/**
 * 故障列表
 * @param data
 * @returns 返回故障列表
 */
const getBreakdownList = async (data: ListDto) => http.get<Breakdown.ListVo>('/sysUser/getList', data)

export { getBreakdownList }

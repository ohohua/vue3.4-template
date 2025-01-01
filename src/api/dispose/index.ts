import type { Dispose } from './dispose.d.ts'
import http from '@/utils/http'

/**
 * 数据处理列表
 * @param data
 * @returns
 */
const getDisposeList = async (data: ListDto) => http.get<Dispose.ListVo>('/sysUser/getList', data)

export { getDisposeList }

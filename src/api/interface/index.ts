import type { Interface } from './interface.js'
import http from '@/utils/http'

/**
 * 数据处理列表
 * @param data
 * @returns list
 */
const getInterfaceList = async (data: ListDto) => http.get<Interface.ListVo>('/sysUser/getList', data)

export { getInterfaceList }

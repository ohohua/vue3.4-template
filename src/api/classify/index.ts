import type { Classify } from './classify.d.ts'
import http from '@/utils/http'

/**
 * 数据分类列表
 * @param data
 * @returns list
 */
const getClassifyList = async (data: ListDto) => http.get<Classify.ListVo>('/sysUser/getList', data)

export { getClassifyList }

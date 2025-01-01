import type { CollectionCustom } from './collectionCustom.d.ts'
import http from '@/utils/http'

/**
 * 采集任务列表
 * @param data
 * @returns
 */
const getCollectionCustomList = async (data: ListDto) => http.get<CollectionCustom.ListVo>('/sysUser/getList', data)

export { getCollectionCustomList }

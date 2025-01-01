import type { Config } from './config'
import http from '@/utils/http'

/**
 * 编辑参数
 * @param data
 * @returns Promise
 */
const editConfig = async (data: Config.EditParamsParams) => http.post<Record<string, unknown>>('/configManagement/update/configManagement', data)
/**
 * 查询参数
 * @returns Config
 */
const getConfig = async () => http.get<Record<string, any>>('/configManagement/get/configManagement')

export { editConfig, getConfig }

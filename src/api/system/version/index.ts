import type { Version } from './version'
import http from '@/utils/http'

/**
 * 版本列表
 * @param data
 * @returns list
 */
const getVersionList = async (data: ListDto) => http.get<Version.ListVo>('/sysSoftVersion/getList', data)
/**
 * 编辑版本
 * @param data
 * @returns Promise
 */
const editVersion = async (data: Version.EditSoftVersionParams) => http.post<Record<string, unknown>>('/sysSoftVersion/edit', data)
/**
 * 新增版本
 * @param data
 * @returns Promise
 */
const addVersion = async (data: Version.EditSoftVersionParams) => http.post<Record<string, unknown>>('/sysSoftVersion/add', data)
/**
 * 下载软件
 * @param id
 * @returns any
 */
const downloadVersion = async (id: string) => http.download('/sysSoftVersion/downLoadFile', { id })
/**
 * 删除
 * @param ids
 * @returns any
 */
const deleteVersion = async (ids: string) => http.delete<Record<string, unknown>>('/sysSoftVersion/delete', { ids })

export { addVersion, deleteVersion, downloadVersion, editVersion, getVersionList }

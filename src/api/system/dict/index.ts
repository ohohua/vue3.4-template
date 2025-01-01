import type { Dict } from './dict'
import http from '@/utils/http'

/**
 * 字典列表
 * @param data
 * @returns
 */
const getDictList = async (data: ListDto) => http.get<Dict.ListVo>('/sysDict/getList', data)
/**
 * 字典值列表
 * @param data
 * @returns
 */
const getDictItemList = async (data: ListDto) => http.get<Dict.ListVo>('/sysDict/getDictItemList', data)
/**
 * 新增字典
 * @param data
 * @returns
 */
const addDict = async (data: Dict.EditDictParams) => http.post<Record<string, unknown>>('/sysDict/add', data)
/**
 * 编辑字典
 * @param data
 * @returns
 */
const editDict = async (data: Dict.EditDictParams) => http.post<Record<string, unknown>>('/sysDict/edit', data)
/**
 * 新增字典值数据
 * @param data
 * @returns
 */
const addDictItem = async (data: Dict.EditDictItemParams) => http.post<Record<string, unknown>>('/sysDict/addDictItem', data)
/**
 * 编辑字典值数据
 * @param data
 * @returns
 */
const editDictItem = async (data: Dict.EditDictItemParams) => http.post<Record<string, unknown>>('/sysDict/editDictItem', data)
/**
 * 根据字典code获取选项值
 * @param dictTypeCode
 * @returns
 */
const getDictItemByCode = async (dictTypeCode: string) => http.get<Dict.DictItem[]>(`/sysDict/getDictItemByCode/${dictTypeCode}`)
/**
 * 删除字典值数据
 * @param ids
 * @returns
 */
const deleteDict = async (ids: string) => http.delete<Record<string, unknown>>('/sysDict/delete', { ids })
/**
 * 删除字典值数据
 * @param ids
 * @returns
 */
const deleteDictItem = async (ids: string) => http.delete<Record<string, unknown>>('/sysDict/deleteDictItem', { ids })

export { addDict, addDictItem, deleteDict, deleteDictItem, editDict, editDictItem, getDictItemByCode, getDictItemList, getDictList }

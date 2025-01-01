import type { Menu } from './menu'
import http from '@/utils/http'

/**
 * 菜单列表
 * @param data
 * @returns list
 */
const getMenuList = async (data: ListDto) => http.get<Menu.ListVo>('/sysMenu/getList', data)
/**
 * 编辑菜单
 * @param data
 * @returns any
 */
const editMenu = async (data: Menu.EditMenuParams) => http.post<Record<string, unknown>>('/sysMenu/edit', data)
/**
 * 新增菜单
 * @param data
 * @returns any
 */
const addMenu = async (data: Menu.EditMenuParams) => http.post<Record<string, unknown>>('/sysMenu/add', data)
/**
 * 删除菜单
 * @param ids
 * @returns any
 */
const deleteMenu = async (ids: string) => http.delete<Record<string, unknown>>('/sysMenu/delete', { ids })

export { addMenu, deleteMenu, editMenu, getMenuList }

import type { Role } from './role'
import http from '@/utils/http'

/**
 * 角色列表
 * @param data
 * @returns list
 */
const getRoleList = async (data: ListDto) => http.get<Role.ListVo<Role.RoleItem>>('/sysRole/getList', data)
/**
 * 删除角色
 * @param ids
 * @returns string
 */
const deleteRole = async (ids: string) => http.delete<Record<string, unknown>>('/sysRole/delete', { ids })
/**
 * 为角色移除用户
 * @param data
 * @returns any
 */
const removeRoleUser = async (data: Role.RemoveRoleUserDto) => http.post<Record<string, unknown>>('/sysRole/removeUser', data)
/**
 * 为角色分配用户
 * @param data
 * @returns any
 */
const addRoleUser = async (data: Role.RemoveRoleUserDto) => http.post<Record<string, unknown>>('/sysRole/addUser', data)
/**
 * 编辑角色
 * @param data
 * @returns any
 */
const editRole = async (data: Role.RoleItem) => http.post<Record<string, unknown>>('/sysRole/edit', data)
/**
 * 新增角色
 * @param data
 * @returns any
 */
const addRole = async (data: Role.RoleItem) => http.post<Record<string, unknown>>('/sysRole/add', data)
/**
 * 为角色设置菜单权限
 * @param data
 * @returns any
 */
const editMenuToRole = async (data: Role.EditMenuToRoleParams) => http.post<Record<string, unknown>>('/sysRole/editMenuToRole', data)
/**
 * 根据角色获取菜单树
 * @param roleId
 * @returns list
 */
const getMenuTreeByRole = async (roleId: string | number) => http.get<Role.RoleMenuTree[]>('/sysRole/tree/menu', { roleId })
/**
 * 查询角色关联和未关联的用户列表
 * @param data
 * @returns list
 */
const getRoleUserList = async (data: ListDto) => http.get<Role.ListVo<unknown>>('/sysRole/getRoleUserList', data)

export { addRole, addRoleUser, deleteRole, editMenuToRole, editRole, getMenuTreeByRole, getRoleList, getRoleUserList, removeRoleUser }

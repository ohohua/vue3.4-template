import http from "@/utils/http";
import type { Menu } from "./menu";

/**
 * 菜单列表
 * @param data
 * @returns
 */
const getMenuList = async (data: ListDto) => http.get<Menu.ListVo>("/sysMenu/getList", data);
/**
 * 编辑菜单
 * @param data
 * @returns
 */
const editMenu = async (data: Menu.EditMenuParams) => http.post<Record<string, unknown>>("/sysMenu/edit", data);
/**
 * 新增菜单
 * @param data
 * @returns
 */
const addMenu = async (data: Menu.EditMenuParams) => http.post<Record<string, unknown>>("/sysMenu/add", data);
/**
 * 删除菜单
 * @param ids
 * @returns
 */
const deleteMenu = async (ids: string) => http.delete<Record<string, unknown>>("/sysMenu/delete", { ids });

export { getMenuList, editMenu, addMenu, deleteMenu };

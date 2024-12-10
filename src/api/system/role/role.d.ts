export namespace Role {
  export interface ListVo<T> {
    list: T[];
    total: number;
  }
  export interface RoleItem {
    /*角色id:新增角色该属性不需要 */
    id?: number;

    /*角色名称: */
    roleName: string;

    /*角色编码: */
    roleCode: string;

    /*角色状态:0.停用 1.启用, 默认为启用 */
    status: number;
    statusStr?: string;

    /*备注: */
    remark?: string;
  }

  // 移除用户dto
  export interface RemoveRoleUserDto {
    userIds: string[] | number[];
    roleId: number | string;
  }

  export interface EditMenuToRoleParams {
    /*角色id: */
    roleId?: number | string;

    /*角色具有权限的菜单id集合: */
    menuIdList?: string[] | number[];
  }

  // 授权树
  export interface RoleMenuTree {
    children: RoleMenuTree[];
    hasBind: boolean;
    menuId: string;
    menuName: string;
  }
}

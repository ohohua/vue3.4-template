export namespace Menu {
  export interface ListVo {
    list: List[];
    total: number;
  }
  interface List {
    id: number;
  }

  export interface EditMenuParams {
    /*菜单id:新增时为null */
    id?: string;

    /*菜单名称: */
    menuName: string;

    /*上级菜单id:无上级菜单时为null */
    parentId?: string;

    /*排序: */
    sort?: number;

    /*访问路径: */
    url?: string;

    /*菜单类型:0.目录 1.页面 2.按钮 */
    menuType?: number;

    /*权限标识: */
    perms?: string;

    /*状态:0.停用 1.启用 */
    status?: number;

    /*菜单图标: */
    icon?: string;

    /*前端组件: */
    webComponent?: string;

    /*打开方式:0.内部 1.外部 */
    openType?: number;

    /*按钮授权标识: */
    authMark?: string;

    /*按钮授权策略:0.可见/可访问  1.可编辑 */
    authStrategy?: number;

    /*是否隐藏:0,不隐藏,1隐藏 */
    hidden?: number;
  }
}

export namespace Login {
  export interface UserInfoDto {
    username?: string;
    password?: string;
    captchaCode?: string;
    captchaKey?: string;
  }

  export interface UserInfoVo {
    authorities: unknown[];
    id: string;
    roles: string[];
    username: string;
    token: string;
    sysMenus: Menu[];
  }

  export interface Menu {
    id: string;
    menuName: string;
    parentId: string;
    sort: number;
    url: string;
    menuType: number;
    perms: number | null;
    status: number;
    icon: string;
    webComponent: string;
    openType: number;
    authMark: string | null;
    authStrategy: unknown;
    hidden: number;
  }
}

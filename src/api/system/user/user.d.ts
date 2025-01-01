export namespace User {
  export interface UserListVo {
    list: DictListVo[]
    total: number
  }
  interface DictListVo {
    id: number
  }

  export interface UpdatePasswordDto {
    username: string
    password: string
  }

  // 编辑用户
  export interface EditUserDto {
    /* 用户id:新增用户时为null */
    id?: number

    /* 用户账号: */
    username?: string

    /* 用户姓名: */
    realName?: string

    /* 登录密码: */
    password?: string

    /* 人员编号: */
    jobNumber?: string

    /* 入伍时间: */
    enlistenmentTime?: Record<string, unknown>

    /* 学历: */
    educationalBackground?: number

    /* 岗位等级（字典）: */
    jobLevel?: number

    /* 军衔（字典）: */
    militaryRank?: number

    /* 毕业院校: */
    telephone?: string

    /* 单位:所属单位 */
    orgId?: string

    /* 角色:用户分配的角色id集合 */
    roleIds?: Record<string, unknown>[]

    /* 岗位:字典值id */
    job?: number

    /* 性别:0.男 1.女 */
    gender?: number

    /* 专业:字典值id */
    major?: number

    /* 出生日期:日期格式为：yyyy-MM-dd */
    birthday?: string

    /* 账户状态:0.冻结 1.正常 */
    status?: number
  }
}

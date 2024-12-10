export namespace Config {
  // 参数接口
  export interface EditParamsParams {
    /*主键id */
    id?: string;

    /*数据库主键字段 */
    sysCode?: string;

    /*登录方式 */
    loginType?: string[];

    /*默认登录方式 */
    defaultLoginType?: number;

    /*终端是否禁用无线电：0否，1是 */
    canUseWifi?: boolean;

    /*终端工作步骤最短停留时间（秒） */
    bestTimes?: number;

    /*终端工作步骤最长停留时间（秒） */
    maximumDuration?: number;

    /*修改时间 */
    updateTime?: Date;

    /*修改人 */
    updateUser?: number;
  }
}

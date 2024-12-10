export namespace Log {
  export interface ListVo {
    list: List[];
    total: number;
  }
  export interface List {
    createTime: Date;
    id: string;
    logType: number;
    logTypeStr: string;
    operateAccount: string;
    operateObject: string;
    operateType: number;
    operateTypeStr: string;
    operateUsername: string;
    requestIp: string;
    status: number;
  }

  export interface EditOperateLogParams {
    /*主键id: */
    id?: string;

    /* */
    operateObject?: string;

    /*操作账号: */
    operateAccount?: string;

    /*操作人: */
    operateUsername?: string;

    /*操作类型，来源OperateType枚举类: */
    operateType?: number;

    /*日志类型（1.操作日志，2.登录日志）: */
    logType?: number;

    /*请求IP: */
    requestIp?: string;

    /*请求地址: */
    requestURL?: string;

    /*请求方式: */
    requestType?: string;

    /*请求参数: */
    requestParam?: string;

    /*操作状态 (0.成功 1.失败): */
    status?: number;

    /*错误消息: */
    errorMsg?: string;

    /*日志生成时间: */
    createTime?: string;
  }
}

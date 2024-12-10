export namespace Version {
  export interface ListVo {
    list: List[];
    total: number;
  }
  export interface List {
    id: string;
    softName?: number;
    fileName?: string;
    softNameStr?: string;
    versionName?: string;
    fileId?: string;
    description?: string;
  }

  export interface EditSoftVersionParams {
    /*id:新增时为null */
    id?: string;

    /*软件名称:字典soft_name中选取字典值id */
    softName?: number;

    /*版本名称: */
    versionName?: string;

    /*文件id:上传附件接口时返回的文件id, 修改时若未重新上传附件, 则该值为null */
    fileId?: string;

    /*版本描述: */
    description?: string;
  }
}

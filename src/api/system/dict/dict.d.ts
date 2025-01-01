export namespace Dict {
  export interface ListVo {
    list: List[]
    total: number
  }
  export interface List {
    id: number | string

    dictTypeName: string

    /* 字典类型编码: */
    dictTypeCode: string

    /* 描述: */
    description?: string

    /* 字典状态:0.停用 1.启用  */
    status: number

    statusStr: string
  }

  export interface EditDictParams {
    /* 主键id:主键id（新增不需要该属性） */
    id?: number

    /* 字典类型名称: */
    dictTypeName: string

    /* 字典类型编码: */
    dictTypeCode: string

    /* 描述: */
    description?: string

    /* 字典状态:0.停用 1.启用  */
    status?: number
  }

  export interface EditDictItemParams {
    /* 字典值id:新增数据时为null */
    id?: number

    /* 字典id: */
    sysDictTypeId: string

    /* 排序: */
    sort?: number

    /* 名称: */
    dictLabel?: string

    /* 数据值: */
    dictValue?: string

    /* 状态:0.停用 1.启用 */
    status?: number

    /* 描述: */
    description?: string
  }

  export interface DictItem {
    dictLabel: string
    dictValue: string | number
    id?: number
  }
}

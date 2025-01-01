import type { Table, TableExpose } from '@/components/table'
import type { TableProps } from '@/components/table/src/types'
import type { ComponentRef, Nullable, Recordable } from '@/types/form'
import type { TableSetPropsType } from '@/types/table'
import type { ElTable } from 'element-plus'
import deleteIcon from '@/components/deleteIcon'
import { ElMessage, ElMessageBox } from 'element-plus'
import { get } from 'lodash-es'
import { computed, nextTick, reactive, ref, unref, watch } from 'vue'

interface TableResponse<T = any> {
  total: number
  list: T[]
  // pageNumber: number;
  // pageSize: number;
}

interface UseTableConfig<T = any> {
  getListApi: (option: any) => Promise<Result<TableResponse<T>>>
  delListApi?: (option: any) => Promise<Result<any>>
  // 返回数据格式配置
  response?: {
    list: string
    total?: string
  }
  props?: TableProps
}

interface TableObject<T = any> {
  pageSize: number
  currentPage: number
  total: number
  tableList: T[]
  params: any
  loading: boolean
  currentRow: Nullable<T>
}

export default function useTable<T = any>(config?: UseTableConfig<T>, params?: Record<string, unknown>) {
  const tableObject = reactive<TableObject<T>>({
    // 页数
    pageSize: 10,
    // 当前页
    currentPage: 1,
    // 总条数
    total: 0,
    // 表格数据
    tableList: [],
    // AxiosConfig 配置
    params: {},
    // 加载中
    loading: true,
    // 当前行的数据
    currentRow: null,
  })

  const paramsObj = computed(() => {
    return {
      ...tableObject.params,
      ...params,
      pageIndex: tableObject.currentPage,
      pageSize: tableObject.pageSize,
    }
  })

  watch(
    () => tableObject.currentPage,
    () => {
      methods.getList()
    },
  )

  watch(
    () => tableObject.pageSize,
    () => {
      // 当前页不为1时，修改页数后会导致多次调用getList方法
      if (tableObject.currentPage === 1) {
        methods.getList()
      }
      else {
        tableObject.currentPage = 1
        methods.getList()
      }
    },
  )

  // Table实例
  const tableRef = ref<typeof Table & TableExpose>()

  // ElTable实例
  const elTableRef = ref<ComponentRef<typeof ElTable>>()

  const register = (ref: typeof Table & TableExpose, elRef: ComponentRef<typeof ElTable>) => {
    tableRef.value = ref
    elTableRef.value = unref(elRef)
  }

  const getTable = async () => {
    await nextTick()
    const table = unref(tableRef)
    if (!table) {
      console.error('The table is not registered. Please use the register method to register')
    }
    return table
  }

  const delData = async (ids: string[] | number[] | string) => {
    const res = await (config?.delListApi && config?.delListApi(ids))
    if (res) {
      ElMessage.success('删除成功')

      // 计算出临界点
      const currentPage
        = tableObject.total % tableObject.pageSize === ids.length || tableObject.pageSize === 1
          ? tableObject.currentPage > 1
            ? tableObject.currentPage - 1
            : tableObject.currentPage
          : tableObject.currentPage

      tableObject.currentPage = currentPage
      methods.getList()
    }
  }

  const methods = {
    getList: async (params: Record<string, unknown> = {}) => {
      tableObject.loading = true
      const res = await config?.getListApi({ ...unref(paramsObj), ...params }).finally(() => {
        tableObject.loading = false
      })
      // const arr = new Array(1).fill({ id: 89 });
      // const res = { data: { list: arr, total: 1 } };
      tableObject.loading = false
      if (res) {
        // 表格数据填装
        tableObject.tableList = get(res.data || {}, (config?.response?.list as string) || 'list')
        tableObject.total = get(res.data || {}, (config?.response?.total as string) || 'total') || 0
        const { loading, tableList, total } = tableObject
        methods.setProps?.({ loading, data: tableList, pagination: config?.props?.pagination ? { total } : undefined })
      }
    },
    setProps: async (props: TableProps = {}) => {
      const table = await getTable()
      table?.setProps(props)
    },
    setColumn: async (columnProps: TableSetPropsType[]) => {
      const table = await getTable()
      table?.setColumn(columnProps)
    },
    getSelections: async () => {
      const table = await getTable()
      return (table?.selections || []) as T[]
    },
    // 与Search组件结合
    setSearchParams: (data: Recordable) => {
      tableObject.currentPage = 1
      tableObject.params = Object.assign(tableObject.params, {
        pageIndex: tableObject.currentPage,
        pageSize: tableObject.pageSize,
        ...data,
      })
      methods.getList()
    },
    // 删除数据
    delList: async (ids: string[] | number[], multiple: boolean, message: string) => {
      const tableRef = await getTable()
      if (multiple) {
        if (!tableRef?.selections.length) {
          ElMessage.warning('请选择需要删除的数据')
          return
        }
      }
      else if (!tableObject.currentRow && !ids.length) {
        ElMessage.warning('请选择需要删除的数据')
        return
      }
      if (message) {
        ElMessageBox.confirm(message, '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
          type: 'warning',
          center: true,
          draggable: true,
          icon: deleteIcon,
        }).then(async () => {
          await delData(ids.join(','))
        })
      }
      else {
        await delData(ids.join(','))
      }
    },
  }

  onMounted(() => {
    config?.props && methods.setProps(config.props)
    methods.getList()
  })
  return {
    register,
    elTableRef,
    tableObject,
    methods,
  }
}

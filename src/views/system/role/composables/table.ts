import type { TableProps } from '@/components/table/src/types'
import { formatter } from '@/utils/option'

const columns = [
  { label: '角色名称', field: 'roleName', minWidth: 100 },
  { label: '角色编码', field: 'roleCode', minWidth: 100 },
  { label: '角色状态', field: 'status', minWidth: 80, formatter },
  { label: '创建时间', field: 'createTime', minWidth: 90 },
  { width: 260, label: '操作', field: 'operation', fixed: 'right' },
]
const pagination = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10,
})

const tableProps: TableProps = reactive({
  columns,
  pagination,
  selection: true,
})

export { tableProps }

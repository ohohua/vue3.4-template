import type { TableProps } from '@/components/table/src/types'
import { formatter } from '@/utils/option'

const columns = [
  { label: '用户账号', field: 'username', minWidth: 100 },
  { label: '用户姓名', field: 'realName', minWidth: 100 },
  { label: '年龄', field: 'age', minWidth: 80 },
  { label: '职务', field: 'jobStr', minWidth: 90 },
  { label: '专业', field: 'majorStr', minWidth: 100 },
  { label: '所属单位', field: 'org', minWidth: 100 },
  { label: '角色', field: 'role', minWidth: 100 },
  { label: '用户状态', field: 'status', minWidth: 100, formatter },
  { width: 180, label: '使用时长统计', field: 'createTime' },
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

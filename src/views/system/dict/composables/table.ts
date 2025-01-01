import type { TableProps } from '@/components/table/src/types'
import { formatter } from '@/utils/option'

const columns = [
  { label: '字典名称', field: 'dictTypeName', minWidth: 100 },
  { label: '字典编码', field: 'dictTypeCode', minWidth: 100 },
  { label: '状态', field: 'status', minWidth: 80, formatter },
  { label: '描述', field: 'description', minWidth: 90 },
  { label: '操作', field: 'operation', width: 260, fixed: 'right' },
]
const pagination = reactive({})

const tableProps: TableProps = reactive({
  columns,
  pagination,
  selection: true,
})

export { tableProps }

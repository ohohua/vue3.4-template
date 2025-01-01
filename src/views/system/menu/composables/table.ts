import type { TableProps } from '@/components/table/src/types'
import { ElTag, type TagProps } from 'element-plus'

const menuTypeMap: Record<number, string> = { 0: '目录', 1: '页面', 2: '按钮' }
const menuTagTypeMap: Record<number, TagProps['type']> = { 0: 'primary', 1: 'success', 2: 'info' }
const columns = [
  { label: '菜单名称', field: 'menuName', minWidth: 100, align: 'left', headerAlign: 'left' },
  {
    label: '菜单类型',
    field: 'menuType',
    minWidth: 100,
    align: 'left',
    headerAlign: 'left',
    formatter: ({ menuType }: { menuType: number }) => h(ElTag, { type: menuTagTypeMap[menuType] }, menuTypeMap[menuType]),
  },
  { label: '组件', field: 'webComponent', minWidth: 100, align: 'left', headerAlign: 'left' },
  { label: '路径', field: 'url', minWidth: 90, align: 'left', headerAlign: 'left' },
  { label: '排序', field: 'sort', minWidth: 80, align: 'left', headerAlign: 'left' },
  { label: '操作', field: 'operation', fixed: 'right', width: 200 },
]

const tableProps: TableProps = reactive({
  columns,
  pagination: {},
  selection: false,
})

export { menuTypeMap, tableProps }

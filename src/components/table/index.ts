import type { ComponentRef, Recordable } from '@/types/form.d'
import type { TableSetPropsType } from '@/types/table.d'
import type { ElTable } from 'element-plus'
import Table from './src/table.vue'

export interface TableExpose {
  setProps: (props: Recordable) => void
  setColumn: (columnProps: TableSetPropsType[]) => void
  selections: Recordable[]
  elTableRef: ComponentRef<typeof ElTable>
}

export { Table }

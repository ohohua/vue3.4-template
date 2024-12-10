import Table from "./src/table.vue";
import { ElTable } from "element-plus";
import type { TableSetPropsType } from "@/types/table.d";
import type { ComponentRef, Recordable } from "@/types/form.d";

export interface TableExpose {
  setProps: (props: Recordable) => void;
  setColumn: (columnProps: TableSetPropsType[]) => void;
  selections: Recordable[];
  elTableRef: ComponentRef<typeof ElTable>;
}

export { Table };

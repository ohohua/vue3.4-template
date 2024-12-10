import type { TableProps } from "@/components/table/src/types";
import { formatterSuccess } from "@/utils/option";

const columns = [
  { label: "操作对象", field: "operateObject", minWidth: 100 },
  { label: "操作账号", field: "operateAccount", minWidth: 100 },
  { label: "操作人", field: "operateUsername", minWidth: 80 },
  { label: "IP", field: "requestIp", minWidth: 90 },
  { label: "操作状态", field: "status", minWidth: 100, formatter: formatterSuccess },
  { label: "操作时间", field: "createTime", minWidth: 100 },
  { label: "日志类型", field: "logTypeStr", minWidth: 100 },
  { width: 180, label: "操作类型", field: "operateTypeStr" },
  { width: 120, label: "操作", field: "operation", fixed: "right" },
];
const pagination = reactive({});

const tableProps: TableProps = reactive({
  columns,
  pagination,
  selection: true,
});

export { tableProps };

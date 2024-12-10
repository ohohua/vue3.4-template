import type { TableProps } from "@/components/table/src/types";

const columns = [
  { label: "软件名称", field: "softNameStr", minWidth: 100 },
  { label: "版本号", field: "versionCode", minWidth: 100 },
  { label: "文件大小", field: "fileSizeStr", minWidth: 80 },
  { label: "附件", field: "fileName", minWidth: 90 },
  { label: "创建时间", field: "createTime", minWidth: 100 },
  { width: 260, label: "操作", field: "operation", fixed: "right" },
];
const pagination = reactive({
  total: 0,
  currentPage: 1,
  pageSize: 10,
});

const tableProps: TableProps = reactive({
  columns,
  pagination,
  selection: true,
});

export { tableProps };

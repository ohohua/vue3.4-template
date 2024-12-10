import useDialog from "@/hooks/useDialog";
const logForm = defineAsyncComponent(() => import("../components/logForm.vue"));

export default function operate(fn: () => void) {
  const { openDialog: handleEdit } = useDialog(logForm, {
    dialogProps: { title: "编辑日志" },
    contentProps: { beforeClose: () => fn() },
  });

  const handleExport = () => {};
  return { handleEdit, handleExport };
}

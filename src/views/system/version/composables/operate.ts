import useDialog from "@/hooks/useDialog";
const versionForm = defineAsyncComponent(() => import("../components/versionForm.vue"));

export default function operate(fn: () => void) {
  const { openDialog: handleAdd } = useDialog(versionForm, {
    dialogProps: { title: "新增软件版本" },
    contentProps: { beforeClose: () => fn() },
  });
  const { openDialog: handleEdit } = useDialog(versionForm, {
    dialogProps: { title: "编辑软件版本" },
    contentProps: { beforeClose: () => fn() },
  });

  return { handleAdd, handleEdit };
}

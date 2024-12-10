import useDialog from "@/hooks/useDialog";
const dictForm = defineAsyncComponent(() => import("../components/dictForm.vue"));

export default function operate(fn: () => void) {
  const { openDialog: handleAdd } = useDialog(dictForm, {
    dialogProps: { title: "新增字典" },
    contentProps: { beforeClose: () => fn() },
  });

  const { openDialog: handleEdit } = useDialog(dictForm, {
    dialogProps: { title: "编辑字典" },
    contentProps: { beforeClose: () => fn() },
  });
  return { handleAdd, handleEdit };
}

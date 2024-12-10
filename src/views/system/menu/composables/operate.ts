import useDialog from "@/hooks/useDialog";
const menuForm = defineAsyncComponent(() => import("../components/menuForm.vue"));

export default function operate(fn: () => void) {
  const { openDialog: handleAdd } = useDialog(menuForm, {
    dialogProps: { title: "新增菜单" },
    contentProps: { beforeClose: () => fn() },
  });
  const { openDialog: handleEdit } = useDialog(menuForm, {
    dialogProps: { title: "编辑菜单" },
    contentProps: { beforeClose: () => fn() },
  });

  return { handleAdd, handleEdit };
}

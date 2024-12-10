import useDialog from "@/hooks/useDialog";
const roleForm = defineAsyncComponent(() => import("../components/roleForm.vue"));

export default function operate(fn: () => void) {
  const { openDialog: handleAdd } = useDialog(roleForm, {
    dialogProps: { title: "新增角色" },
    contentProps: { beforeClose: () => fn() },
  });
  const { openDialog: handleEdit } = useDialog(roleForm, {
    dialogProps: { title: "编辑角色" },
    contentProps: { beforeClose: () => fn() },
  });

  return { handleAdd, handleEdit };
}

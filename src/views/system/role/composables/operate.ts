import useDialog from '@/hooks/useDialog'

const RoleForm = defineAsyncComponent(() => import('../components/RoleForm.vue'))

export default function operate(fn: () => void) {
  const [handleAdd] = useDialog(RoleForm, {
    dialogProps: { title: '新增角色' },
    contentProps: { beforeClose: () => fn() },
  })
  const [handleEdit] = useDialog(RoleForm, {
    dialogProps: { title: '编辑角色' },
    contentProps: { beforeClose: () => fn() },
  })

  return { handleAdd, handleEdit }
}

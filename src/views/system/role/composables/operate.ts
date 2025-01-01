import useDialog from '@/hooks/useDialog'

const roleForm = defineAsyncComponent(() => import('../components/roleForm.vue'))

export default function operate(fn: () => void) {
  const [handleAdd] = useDialog(roleForm, {
    dialogProps: { title: '新增角色' },
    contentProps: { beforeClose: () => fn() },
  })
  const [handleEdit] = useDialog(roleForm, {
    dialogProps: { title: '编辑角色' },
    contentProps: { beforeClose: () => fn() },
  })

  return { handleAdd, handleEdit }
}

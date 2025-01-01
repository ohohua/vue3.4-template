import useDialog from '@/hooks/useDialog'

const userForm = defineAsyncComponent(() => import('../components/userForm.vue'))
const importForm = defineAsyncComponent(() => import('@/components/import/importForm.vue'))

export default function operate(fn: () => void) {
  const [handleAdd] = useDialog(userForm, {
    dialogProps: { title: '新增人员' },
    contentProps: { beforeClose: () => fn() },
  })
  const [handleEdit] = useDialog(userForm, {
    dialogProps: { title: '编辑人员' },
    contentProps: { beforeClose: () => fn() },
  })
  const [handleImport] = useDialog(importForm, {
    dialogProps: { title: '导入人员' },
    contentProps: { beforeClose: () => fn() },
  })

  const handleExport = () => {}
  return { handleAdd, handleEdit, handleImport, handleExport }
}

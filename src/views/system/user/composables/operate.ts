import useDialog from '@/hooks/useDialog'

const UserForm = defineAsyncComponent(() => import('../components/UserForm.vue'))
const ImportForm = defineAsyncComponent(() => import('@/components/import/ImportForm.vue'))

export default function operate(fn: () => void) {
  const [handleAdd] = useDialog(UserForm, {
    dialogProps: { title: '新增人员' },
    contentProps: { beforeClose: () => fn() },
  })
  const [handleEdit] = useDialog(UserForm, {
    dialogProps: { title: '编辑人员' },
    contentProps: { beforeClose: () => fn() },
  })
  const [handleImport] = useDialog(ImportForm, {
    dialogProps: { title: '导入人员' },
    contentProps: { beforeClose: () => fn() },
  })

  const handleExport = () => {}
  return { handleAdd, handleEdit, handleImport, handleExport }
}

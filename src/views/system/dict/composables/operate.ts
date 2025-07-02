import useDialog from '@/hooks/useDialog'

const DictForm = defineAsyncComponent(() => import('../components/DictForm.vue'))

export default function operate(fn: () => void) {
  const [handleAdd] = useDialog(DictForm, {
    dialogProps: { title: '新增字典' },
    contentProps: { beforeClose: () => fn() },
  })

  const [handleEdit] = useDialog(DictForm, {
    dialogProps: { title: '编辑字典' },
    contentProps: { beforeClose: () => fn() },
  })
  return { handleAdd, handleEdit }
}

import useDialog from '@/hooks/useDialog'

const LogForm = defineAsyncComponent(() => import('../components/LogForm.vue'))

export default function operate(fn: () => void) {
  const [handleEdit] = useDialog(LogForm, {
    dialogProps: { title: '编辑日志' },
    contentProps: { beforeClose: () => fn() },
  })

  const handleExport = () => {}
  return { handleEdit, handleExport }
}

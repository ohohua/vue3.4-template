<script setup lang="ts">
import type { Dict } from '@/api/system/dict/dict'
import type { FormProps } from '@/components/form/src/types'
import { addDict, editDict } from '@/api'
import useForm from '@/hooks/useForm'
import { useValidator } from '@/hooks/useValidator'

const props = defineProps<Dict.List & { beforeClose: () => void }>()
const emits = defineEmits(['close'])
const { rules } = useValidator()

const formProps = reactive<FormProps>({
  inline: true,
  isCol: false,
  schema: [
    { field: 'dictTypeName', label: '字典名称', component: 'Input', componentProps: { style: { width: '400px' } }, formItemProps: { rules: rules('请输入字典名称') } },
    { field: 'dictTypeCode', label: '字典编码', component: 'Input', componentProps: { style: { width: '400px' } }, formItemProps: { rules: rules('请输入字典编码') } },
    {
      field: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        style: {
          width: '400px',
        },
        options: [
          { label: '启用', value: 1 },
          { label: '停用', value: 0 },
        ],
      },
      formItemProps: { rules: rules('请选择字典状态') },
    },
    {
      field: 'description',
      label: '描述',
      component: 'Input',
      componentProps: { type: 'textarea', autosize: { minRows: 4, maxRows: 4 }, resize: 'none', showWordLimit: true, maxlength: 500, style: { width: '400px' } },
      formItemProps: { showMessage: false },
    },
  ],
})

function emptyForm(data: any) {
  const empty = {}
  return Object.assign(empty, data)
}
const { register, elFormRef, methods } = useForm(formProps)

async function handleConfirm() {
  const data = await methods.getFormData()
  elFormRef.value?.validate(async (valid) => {
    if (valid) {
      const dictApi = props.id ? editDict : addDict
      const res = await dictApi(data as Dict.EditDictParams)
      ElMessage.success(res.message)
      props.beforeClose()
      emits('close')
    }
  })
}

onMounted(() => {
  methods.setValues(emptyForm(props))
})
defineExpose({ elFormRef, methods })
</script>

<template>
  <div class="text-center">
    <Form class="p-4" @register="register" />
    <Footer cancel confirm @cancel="emits('close')" @confirm="handleConfirm" />
  </div>
</template>

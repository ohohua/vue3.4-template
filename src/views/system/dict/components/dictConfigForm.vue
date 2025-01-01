<script setup lang="ts">
import type { Dict } from '@/api/system/dict/dict'
import type { FormProps } from '@/components/form/src/types'
import { addDictItem, editDictItem } from '@/api'
import useForm from '@/hooks/useForm'
import { useValidator } from '@/hooks/useValidator'

type Props = Dict.EditDictItemParams & { beforeClose: () => void }
const props = defineProps<Props>()
const emits = defineEmits(['close'])
const { rules } = useValidator()

const formProps = reactive<FormProps>({
  inline: true,
  isCol: false,
  schema: [
    { field: 'dictLabel', label: '名称', component: 'Input', componentProps: { maxlength: 30, style: { width: '400px' } }, formItemProps: { rules: rules('请输入名称') } },
    { field: 'dictValue', label: '数据值', component: 'Input', componentProps: { maxlength: 30, style: { width: '400px' } }, formItemProps: { rules: rules('请输入数据值') } },
    {
      field: 'sort',
      label: '排序',
      component: 'InputNumber',
      componentProps: { controlsPosition: 'right', style: { width: '400px' } },
      formItemProps: { rules: rules('请输入排序') },
    },
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
      formItemProps: { rules: rules('请选择状态') },
    },
    {
      field: 'description',
      label: '描述',
      component: 'Input',
      componentProps: { type: 'textarea', autosize: { minRows: 4, maxRows: 4 }, resize: 'none', showWordLimit: true, maxlength: 500, style: { width: '400px' } },
      formItemProps: {},
    },
  ],
})

function emptyForm(data: any) {
  const empty = {
    id: undefined,
    sysDictTypeId: undefined,
    sort: undefined,
    dictLabel: undefined,
    dictValue: undefined,
    status: undefined,
    description: undefined,
  }
  return Object.assign(empty, data)
}
const { register, elFormRef, methods } = useForm(formProps)

async function handleConfirm() {
  const data = await methods.getFormData()
  elFormRef.value?.validate(async (valid) => {
    if (valid) {
      const dictApi = props.id ? editDictItem : addDictItem
      const res = await dictApi(data as Dict.EditDictItemParams)
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

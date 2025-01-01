<script setup lang="ts">
import type { Version } from '@/api/system/version/version'
import type { FormProps } from '@/components/form/src/types'
import type { FormSetPropsType } from '@/types/form'
import { addVersion, editVersion, getDictItemByCode } from '@/api'
import useForm from '@/hooks/useForm'
import { useValidator } from '@/hooks/useValidator'
import { optionsAlias } from '@/utils/option'

const props = defineProps<Version.List & { beforeClose: () => void }>()
const emits = defineEmits(['close'])

const { rules } = useValidator()
const formProps = reactive<FormProps>({
  inline: false,
  isCol: false,
  schema: [
    { field: 'softName', label: '软件名称', component: 'Select', componentProps: { options: [], optionsAlias, style: { width: '240px' } }, formItemProps: { required: true, showMessage: false } },
    { field: 'versionName', label: '版本名称', component: 'Input', componentProps: { style: { width: '240px' } }, formItemProps: {} },
    { field: 'description', label: '版本描述', component: 'Input', componentProps: { style: { width: '500px' } }, formItemProps: {} },
    { field: 'file', label: '上传附件', component: 'UploadFile', componentProps: { style: { width: '500px' } }, formItemProps: { rules: rules('请上传附件') } },
  ],
})

function emptyForm(data: any) {
  const empty = {
    softName: undefined,
    fileName: undefined,
    versionName: undefined,
    fileId: undefined,
    description: undefined,
  }
  return Object.assign(empty, data)
}
const { register, elFormRef, methods } = useForm(formProps)

async function handleConfirm() {
  const data = await methods.getFormData()
  elFormRef.value?.validate(async (valid) => {
    if (valid) {
      const params = { ...data, fileId: data?.file[0].id }
      const api = props.id ? editVersion : addVersion
      const res = await api(params as Version.EditSoftVersionParams)
      ElMessage.success(res.message)
      emits('close')
      props.beforeClose()
    }
  })
}

// 获取下拉选项
async function getOption() {
  // 处理 options
  const schemaProps: FormSetPropsType[] = (formProps.schema || [])
    ?.filter(item => item.component === 'Select')
    ?.map((item) => {
      return {
        field: item.field,
        path: ['componentProps', 'options'],
        value: [],
      }
    })

  for (const item of schemaProps) {
    item.value = (await getDictItemByCode(item.field)).data
  }

  methods.setSchema(schemaProps)
}

onMounted(() => {
  const value = emptyForm(props)
  value.file = value.fileId ? [{ fileId: value.fileId, url: value.fileName }] : []

  methods.setValues(value)
  getOption()
})
defineExpose({ elFormRef, methods })
</script>

<template>
  <div class="text-center">
    <Form class="p-4" @register="register" />
    <Footer cancel confirm @cancel="emits('close')" @confirm="handleConfirm" />
  </div>
</template>

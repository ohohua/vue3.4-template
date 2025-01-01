<script setup lang="ts">
import type { Log } from '@/api/system/log/log'
import type { FormProps } from '@/components/form/src/types'
import { editLog } from '@/api'
import useForm from '@/hooks/useForm'
import { optionsAlias } from '@/utils/option'
import search from '../composables/search'

const props = defineProps<Log.List & { beforeClose: () => void }>()
const emits = defineEmits(['close'])

const { searchOptions } = search(() => {})
const formProps = reactive<FormProps>({
  inline: true,
  isCol: false,
  schema: [
    { field: 'operateObject', label: '操作对象', component: 'Input', componentProps: { style: { width: '580px' } }, formItemProps: {} },
    { field: 'operateUsername', label: '操作人', component: 'Input', componentProps: { style: { width: '240px' } }, formItemProps: {} },
    { field: 'operateAccount', label: '操作账号', component: 'Input', componentProps: { style: { width: '240px' } }, formItemProps: {} },
    { field: 'operateType', label: '操作类型', component: 'Select', componentProps: { options: searchOptions.operateType, optionsAlias, style: { width: '240px' } }, formItemProps: {} },
    { field: 'logType', label: '日志类型', component: 'Select', componentProps: { options: searchOptions.logType, optionsAlias, style: { width: '240px' } }, formItemProps: {} },
    { field: 'requestIp', label: '请求IP' },
    { field: 'methods', label: '请求方式' },
    { field: 'params', label: '请求参数' },
    { field: 'status', label: '操作状态' },
    { field: 'createTime', label: '操作时间' },
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
      const res = await editLog(data as Log.EditOperateLogParams)
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
    <Form class="p-4" @register="register">
      <template #requestIp>
        <div class="w-[580px] text-left">
          {{ requestIp }}
        </div>
      </template>
      <template #methods>
        <div class="w-[580px] text-left">
          {{ requestIp }}
        </div>
      </template>
      <template #params>
        <div class="w-[580px] text-left">
          {{ requestIp }}
        </div>
      </template>
      <template #status>
        <div class="w-[580px] text-left">
          {{ searchOptions.status.find((item) => item.id === status)?.dictLabel }}
        </div>
      </template>
      <template #createTime>
        <div class="w-[580px] text-left">
          {{ createTime }}
        </div>
      </template>
    </Form>
    <Footer cancel confirm @cancel="emits('close')" @confirm="handleConfirm" />
  </div>
</template>

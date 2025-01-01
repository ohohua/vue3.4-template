<script setup lang="ts">
import type { Menu } from '@/api/system/menu/menu'
import type { FormProps } from '@/components/form/src/types'
import type { FormSetPropsType } from '@/types/form'
import { addMenu, editMenu, getMenuList } from '@/api'
import useForm from '@/hooks/useForm'
import { useValidator } from '@/hooks/useValidator'
import { optionsAlias, statusOptions } from '@/utils/option'

const props = defineProps<Menu.EditMenuParams & { beforeClose: () => void }>()
const emits = defineEmits(['close'])

const { rules } = useValidator()
const formProps = reactive<FormProps>({
  inline: true,
  isCol: false,
  schema: [
    {
      field: 'menuType',
      label: '菜单类型',
      component: 'SelectMenuType',
      componentProps: { style: { width: '240px' } },
      // formItemProps: { style: { display: "inline-block", width: "500px" }, rules: rules("请选择工卡") },
      formItemProps: { rules: rules('请选择菜单类型') },
    },
    {
      field: 'parentId',
      label: '上级菜单',
      component: 'TreeSelect',
      componentProps: { data: [], props: { label: 'menuName', value: 'id', children: 'children' }, style: { width: '240px' } },
      formItemProps: {},
    },
    { field: 'menuName', label: '菜单名称', component: 'Input', componentProps: { style: { width: '240px' } }, formItemProps: { rules: rules('请输入菜单名称') } },
    { field: 'icon', label: '菜单图标', component: 'Input', componentProps: { style: { width: '240px' } }, formItemProps: {} },
    { field: 'url', label: '访问路径', component: 'Input', componentProps: { style: { width: '240px' } }, formItemProps: { rules: rules('请输入访问路径') } },
    { field: 'webComponent', label: '前端组件', component: 'Input', componentProps: { style: { width: '240px' } }, formItemProps: { rules: rules('请输入前端组件') } },
    { field: 'sort', label: '排序', component: 'InputNumber', componentProps: { controlsPosition: 'right', style: { width: '240px' } }, formItemProps: {} },
    {
      field: 'status',
      label: '菜单状态',
      component: 'Select',
      componentProps: { options: statusOptions, optionsAlias, style: { width: '240px' } },
      formItemProps: { rules: rules('请选择菜单状态') },
    },
  ],
})

function emptyForm(data: any) {
  const empty = {
    id: '',
    menuName: '',
    parentId: '',
    sort: 0,
    url: '',
    menuType: 0,
    perms: '',
    status: 0,
    icon: '',
    webComponent: '',
    openType: 0,
    authMark: '',
    authStrategy: 0,
    hidden: 0,
  }
  return Object.assign(empty, data)
}
const { register, elFormRef, methods } = useForm(formProps)

async function handleConfirm() {
  const data = await methods.getFormData()
  elFormRef.value?.validate(async (valid) => {
    if (valid) {
      const api = props.id ? editMenu : addMenu
      const res = await api(data as Menu.EditMenuParams)
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
    ?.filter(item => item.component === 'TreeSelect')
    ?.map((item) => {
      return {
        field: item.field,
        path: ['componentProps', 'data'],
        value: [],
      }
    })

  for (const item of schemaProps) {
    const res = await getMenuList({ pageIndex: 1, pageSize: 9999 })
    const { list } = res.data
    item.value = list
  }

  methods.setSchema(schemaProps)
}

onMounted(() => {
  methods.setValues(emptyForm(props))

  getOption()
})
defineExpose({ elFormRef, methods })
</script>

<template>
  <div class="text-center menu-form">
    <Form class="p-4" @register="register" />
    <Footer cancel confirm @cancel="emits('close')" @confirm="handleConfirm" />
  </div>
</template>

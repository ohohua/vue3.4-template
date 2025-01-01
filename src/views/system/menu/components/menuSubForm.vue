<script setup lang="ts">
import type { Menu } from '@/api/system/menu/menu'
import type { FormProps } from '@/components/form/src/types'
import type { FormSetPropsType } from '@/types/form'
import { addMenu, getMenuList } from '@/api'
import useForm from '@/hooks/useForm'
import { useValidator } from '@/hooks/useValidator'
import { optionsAlias, statusOptions } from '@/utils/option'
import { menuTypeMap } from '../composables/table'

const props = defineProps<{ id: string, beforeClose: () => void }>()
const emits = defineEmits(['close'])

const { rules } = useValidator()
const formProps = reactive<FormProps>({
  inline: true,
  isCol: false,
  schema: [
    {
      field: 'menuType',
      label: '菜单类型',
      component: 'Input',
      componentProps: { style: { width: '240px' } },
      formItemProps: { required: true, rules: rules('请选择菜单类型') },
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

const menuTypeList = computed(() => Object.values(menuTypeMap))

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
const typeIndex = ref<number>()
const { register, elFormRef, methods } = useForm(formProps)

function handleChoose(index: number) {
  typeIndex.value = index
  methods.setValues({ menuType: index })
}

async function handleConfirm() {
  const data = await methods.getFormData()
  elFormRef.value?.validate(async (valid) => {
    if (valid) {
      if (data)
        data.menuType = typeIndex.value
      const res = await addMenu(data as Menu.EditMenuParams)
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
    const { data } = await getMenuList({ pageIndex: 1, pageSize: 9999 })
    const { list } = data
    item.value = list
  }

  methods.setSchema(schemaProps)
}

onMounted(() => {
  methods.setValues(emptyForm({ parentId: props.id }))
  getOption()
})
defineExpose({ elFormRef, methods })
</script>

<template>
  <div class="text-center menu-form">
    <Form class="p-4" @register="register">
      <template #menuType>
        <div class="w-[240px] flex">
          <div v-for="(item, index) in menuTypeList" :key="index" class="default" :class="[typeIndex === index && 'active']" @click="handleChoose(index)">
            {{ item }}
          </div>
        </div>
      </template>
    </Form>
    <Footer cancel confirm @cancel="emits('close')" @confirm="handleConfirm" />
  </div>
</template>

<style lang="scss" scoped>
.menu-form {
  .default {
    color: #2dabff;
    border: 1px solid #2dabff;
    border-radius: 4px;
    width: 60px;
    height: 32px;
    cursor: pointer;
    user-select: none;
  }
  .default + .default {
    margin-left: 10px;
  }

  .active {
    background-color: #2dabff;
    color: #fff;
  }
}
</style>

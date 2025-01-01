<script setup lang="ts">
import type { Role } from '@/api/system/role/role'
import { editMenuToRole, getMenuTreeByRole } from '@/api'

const props = defineProps<{ roleId: string }>()
const emits = defineEmits(['close'])

const treeList = ref<Role.RoleMenuTree[]>([])
const menuIdList = ref<string[]>([])

async function getTreeList() {
  const { data } = await getMenuTreeByRole(props.roleId)
  treeList.value = data
}
async function handleConfirm() {
  const res = await editMenuToRole({ roleId: props.roleId, menuIdList: menuIdList.value })
  console.log(res)
  emits('close')
}
onMounted(() => getTreeList())
</script>

<template>
  <div>
    <el-tree ref="authTree" class="py-4" :data="treeList" :props="{ children: 'children', label: 'menuName' }" node-key="menuId" show-checkbox />
    <Footer cancel confirm @cancel="emits('close')" @confirm="handleConfirm" />
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import { getMenuTreeByRole, editMenuToRole } from "@/api";
import type { Role } from "@/api/system/role/role";

const props = defineProps<{ roleId: string }>();
const emits = defineEmits(["close"]);

const treeList = ref<Role.RoleMenuTree[]>([]);
const menuIdList = ref<string[]>([]);

const getTreeList = async () => {
  const { data } = await getMenuTreeByRole(props.roleId);
  treeList.value = data;
};
const handleConfirm = async () => {
  const res = await editMenuToRole({ roleId: props.roleId, menuIdList: menuIdList.value });
  console.log(res);
  emits("close");
};
onMounted(() => getTreeList());
</script>

<template>
  <div>
    <el-tree class="py-4" ref="authTree" :data="treeList" :props="{ children: 'children', label: 'menuName' }" node-key="menuId" show-checkbox />
    <Footer cancel confirm @cancel="emits('close')" @confirm="handleConfirm"></Footer>
  </div>
</template>

<style scoped lang="scss"></style>

<script setup lang="ts">
import type { Role } from '@/api/system/role/role'

defineProps<Role.RoleItem>()
</script>

<template>
  <div class="p-4 task-detail">
    <div class="flex justify-center mb-5">
      <div>
        <label class="require">角色类型：</label>
        <span>{{ roleName }}</span>
      </div>
      <div>
        <label class="require">角色编码：</label>
        <span>{{ roleCode }}</span>
      </div>
    </div>
    <div class="flex justify-center mb-5">
      <div class="">
        <label class="require">角色状态：</label>
        <span>{{ statusStr }}</span>
      </div>
      <div class="w-[300px]" />
    </div>
    <div class="flex justify-center mb-5">
      <div>
        <label>备注：</label>
        <span>{{ remark }}</span>
      </div>
      <div class="w-[300px]" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.task-detail {
  label {
    display: inline-block;
    font-weight: bold;
    width: 100px;
    text-align: right;
  }
  .require::before {
    content: "*";
    color: red;
  }
  span {
    display: inline-block;
    min-width: 200px;
  }
}
</style>

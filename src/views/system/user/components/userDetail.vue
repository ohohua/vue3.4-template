<script setup lang="ts">
import type { User } from "@/api/system/user/user";

defineProps<User.EditUserDto>();
</script>

<template>
  <div class="p-4 task-detail">
    <div class="mb-5">
      <label class="require">用户账号：</label>
      <span>{{ username }}</span>
    </div>
    <div class="flex mb-5">
      <div>
        <label class="require">姓名：</label>
        <span>{{ realName }}</span>
      </div>
      <div>
        <label class="require">专业：</label>
        <span>{{ major }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label class="require">人员编号：</label>
        <span>{{ jobNumber }}</span>
      </div>
      <div>
        <label>职务等级：</label>
        <span>{{ jobLevel }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label class="require">职务：</label>
        <span>{{ job }}</span>
      </div>
      <div>
        <label class="require">所属单位：</label>
        <span>{{ orgId }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label class="require">角色：</label>
        <span>{{ roleIds }}</span>
      </div>
      <div>
        <label class="require">出生日期：</label>
        <span>{{ birthday }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label class="require">性别：</label>
        <span>{{ gender }}</span>
      </div>
      <div>
        <label class="require">学历：</label>
        <span>{{ educationalBackground }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label class="require">毕业学校：</label>
        <span>{{ telephone }}</span>
      </div>
      <div>
        <label class="require">军衔：</label>
        <span>{{ militaryRank }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label class="require">入伍日期：</label>
        <span>{{ enlistenmentTime }}</span>
      </div>
      <div>
        <label class="require">账号状态：</label>
        <span>{{ status }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label class="require">使用日期：</label>
        <span>{{ job }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label class="require">使用时长统计：</label>
        <span>{{ major }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.task-detail {
  label {
    display: inline-block;
    font-weight: bold;
    width: 120px;
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

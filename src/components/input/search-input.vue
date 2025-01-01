<script setup lang="ts">
import { ElIcon } from 'element-plus'
// import { Search } from "@element-plus/icons";
</script>

<template>
  <div class="search-input">
    <input placeholder="按机构名称搜索">
    <ElIcon>
      <!-- <Search /> -->
    </ElIcon>
  </div>
</template>

<style lang="scss" scoped>
.search-input {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #dedede;
  border-radius: 4px;
  padding: 5px 20px;

  input {
    flex: 1;
  }
}
</style>

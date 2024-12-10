<script setup lang="ts">
import { ArrowRight } from "@element-plus/icons-vue";

defineProps<{ collapse?: boolean }>();

const show = ref(true);
</script>

<template>
  <div ref="el">
    <div class="flex title">
      <slot></slot>
      <div v-if="collapse" class="flex items-center ml-4 h-[24px] text-[14px] cursor-pointer" @click="show = !show">
        <div :class="show && 'show'">{{ show ? "收起" : "展开" }}</div>
        <el-icon><ArrowRight /></el-icon>
      </div>
    </div>
    <el-collapse-transition>
      <div v-show="show">
        <slot name="content"></slot>
      </div>
    </el-collapse-transition>
  </div>
</template>

<style scoped lang="scss">
.title {
  font-size: 16px;
  font-weight: bold;
  color: #4b9aff;
}
.show + i {
  transform: rotate(90deg);
  transition: transform 0.2s;
}
i {
  transition: transform 0.2s;
}
</style>

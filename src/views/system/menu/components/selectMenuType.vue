<script setup lang="ts">
import { menuTypeMap } from '../composables/table'

const menuTypeList = computed(() => Object.values(menuTypeMap))

const typeIndex = defineModel<number>()
function handleChoose(index: number) {
  typeIndex.value = index
}
</script>

<template>
  <div class="w-[240px] flex">
    <div
      v-for="(item, index) in menuTypeList" :key="index" class="default" :class="[typeIndex === index && 'active']"
      @click="handleChoose(index)"
    >
      {{ item }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.default {
  color: #2dabff;
  border: 1px solid #2dabff;
  border-radius: 4px;
  width: 60px;
  height: 32px;
  cursor: pointer;
  user-select: none;
}

.default+.default {
  margin-left: 10px;
}

.active {
  background-color: #2dabff;
  color: #fff;
}
</style>

<script setup lang="ts">
defineProps<{ placeholder: string, options: any[] }>()

const innerValue = defineModel<number | undefined>()
const selectEl = ref()
const labelEl = ref()

watch(
  innerValue,
  (val) => {
    if (labelEl.value) {
      labelEl.value.style = val ? 'top: -10px; color: #409eff;' : 'top: 50%'
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="mt-5 flexible-select">
    <el-select ref="selectEl" v-model="innerValue" clearable placeholder="">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <label ref="labelEl" class="absolute text-gray-400 transition-all duration-300 transform -translate-y-1/2 cursor-text placeholder top-1/2 left-2 -z-20" @click="selectEl.click()">
      {{ innerValue ? placeholder : `请选择${placeholder}` }}
    </label>
  </div>
</template>

<style lang="scss" scoped>
.flexible-select {
  position: relative;

  .placeholder {
    font-size: 0.875rem; // Tailwind CSS中的 text-sm 相当于 14px
  }
  :deep(.el-select) {
    position: relative;
    .el-select__wrapper {
      height: 40px;
      background-color: transparent;
      box-shadow: 0 0 0 2px var(--el-border-color) inset;
    }
    .el-select__wrapper.is-focused {
      box-shadow: 0 0 0 2px var(--el-color-primary) inset;
    }
  }
}
</style>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    name: string
  }>(),
  {
    name: '',
  },
)

function getAssetsFile(url: string) {
  return new URL(`../../assets/images/${url}`, import.meta.url).href
}

const iconName = computed(() => {
  const name = props.name.replace(/[A-Z]/g, i => `_${i.toLowerCase()}`)
  return name && `${name}.png`
})

function vClass(el: Element, binding: any) {
  if (binding.arg === 'add') {
    el.classList.add(binding.value)
  }
}
</script>

<template>
  <el-image v-if="iconName" v-class:add="$attrs.size" class="icon" fit="contain" alt="图标" :src="getAssetsFile(iconName)" />
</template>

<style lang="scss" scoped>
.icon {
  height: 16px !important;
  width: 16px !important;
  margin: 0 5px;

  &.medium {
    height: 28px;
  }
}
</style>

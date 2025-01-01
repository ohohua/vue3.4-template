<script setup lang="ts">
import { Hide, View } from '@element-plus/icons-vue'

const props = defineProps<{ placeholder: string, password: boolean }>()

const innerValue = defineModel<string>()
const inputEl = ref()

const isPasswordVisible = ref(!props.password)
function togglePasswordVisibility() {
  isPasswordVisible.value = !isPasswordVisible.value
}
</script>

<template>
  <div class="relative mt-5">
    <input
      ref="inputEl"
      v-model="innerValue"
      :type="isPasswordVisible ? 'text' : 'password'"
      class="w-full h-10 px-3 transition-all duration-300 bg-transparent border-2 border-[#dcdfe6] rounded outline-none focus:border-[#409eff]"
      placeholder=""
      autocomplete="new-password"
    >
    <label class="absolute text-gray-400 transition-all duration-300 transform -translate-y-1/2 cursor-text placeholder top-1/2 left-2" @click="inputEl.focus()">
      {{ innerValue ? placeholder : `请输入${placeholder}` }}
    </label>

    <div v-if="password" class="password-toggle absolute top-2.5 right-2 cursor-pointer">
      <el-icon @click="togglePasswordVisibility">
        <component :is="isPasswordVisible ? View : Hide" />
      </el-icon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.placeholder {
  font-size: 0.875rem; // Tailwind CSS中的 text-sm 相当于 14px
}

input:focus + .placeholder,
input:not(:placeholder-shown) + .placeholder {
  top: 0;
  left: 0.5rem; // Tailwind CSS中的 left-2 相当于 0.5rem
  color: #409eff; // Tailwind CSS中的 text-blue-500 的颜色值
  transform: translateY(-100%) !important;
}
</style>

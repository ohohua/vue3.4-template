<!-- 折叠按钮 -->
<script setup lang="ts">
import Icon from '@/components/icon/icon.vue'
import { ElButton, ElDropdown, ElDropdownItem } from 'element-plus'

withDefaults(
  defineProps<{
    options: string[]
    icon?: string
    disabled: boolean
    isOnline?: boolean
  }>(),
  {
    options: () => [],
    icon: '',
    disabled: true,
    isOnline: true,
  },
)

const emit = defineEmits(['callback'])
/**
 * 点击选项
 */
function commandBtn(val: string) {
  emit('callback', val)
}
</script>

<template>
  <ElDropdown placement="top" :disabled="disabled" trigger="click" @command="commandBtn">
    <slot name="button">
      <ElButton type="primary" v-bind="attrs" :disabled="disabled">
        <slot>更多菜单</slot>
        <Icon v-if="icon" :name="icon" />
      </ElButton>
    </slot>
    <template #dropdown>
      <el-dropdown-menu>
        <ElDropdownItem v-for="(o, i) in options" :key="o" :command="o" :disabled="[3, 4].includes(i) && !isOnline">
          {{ o }}
        </ElDropdownItem>
      </el-dropdown-menu>
    </template>
  </ElDropdown>
</template>

<style lang="scss" scoped>
.el-button {
  color: #fff;
  background-image: linear-gradient(90deg, #1a73e4, #1c8de5, #1ea9e7);
  background-repeat: no-repeat;
  background-size: 110% 110%;
  background-position: -2px 0;
  height: 40px;
  min-width: 97px;
}

.icon {
  width: 17px;
  height: 14px;
  margin: 0 5px;
}

.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover,
.is-plain.is-disabled,
.is-plain.is-disabled:focus,
.is-plain.is-disabled:hover {
  opacity: 0.7;
}

.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  background-color: #1c8de5;
}

.el-button.is-plain {
  color: #4b9aff;
  border: #4b9aff 1.5px solid;
  opacity: 1;
  background-color: #fff !important;
  background-image: none;
}

.is-plain.is-disabled,
.is-plain.is-disabled:focus,
.is-plain.is-disabled:hover {
  border: #c0c6dc solid 1.5px;
  color: #c0c6dc;
  filter: grayscale(100%);
}
</style>

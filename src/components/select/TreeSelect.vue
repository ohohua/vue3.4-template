<script lang="ts" setup>
import { ElTreeSelect } from 'element-plus'
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    label: string
    modelValue: string
  }>(),
  {
    label: '',
    modelValue: '',
  },
)
const emit = defineEmits(['update:modelValue'])
const trees = ref(null)

const innerValue = computed({
  get: () => props.modelValue,
  set: val => emit('update:modelValue', val),
})
// 选中节点
// const clickNode = (node: any) => {
//   const tree: any = trees.value
//   tree.setCheckedKeys([node.id], false, true)
//   emit('update:modelValue', node.id)
// }
</script>

<template>
  <div class="label-select">
    <span class="label-select__title">{{ label }}</span>
    <span class="pdStyle">|</span>
    <ElTreeSelect v-bind="$attrs" ref="trees" v-model="innerValue" :placeholder="`请选择${label}`" class="flex-1" />
  </div>
</template>

<style lang="scss" scoped>
.label-select {
  padding: 0px 15px;
  display: flex;
  align-items: center;
  color: #d5d5d5;
  background-color: #fff;
  border: 1.5px solid #4b9aff;
  border-radius: 4px;
  margin: 5px 0;
  height: 40px;
  .label-select__title {
    padding-right: 10px;
    color: #010101;
    font-size: 16px;
    font-weight: bold;
  }
  .pdStyle {
    padding-right: 10px;
    color: #d5d5d5;
  }
  .el-select {
    display: flex;
    align-items: center;
    box-shadow: none !important;
  }
  ::v-deep(.el-input__inner) {
    box-shadow: none !important;
    border: none;
    padding: 0;
  }
  ::v-deep(.el-select .el-input.is-focus .el-input__inner) {
    box-shadow: none !important;
  }
  ::v-deep(.el-select__wrapper) {
    box-shadow: none !important;
    border: none;
    padding-left: 0px;
    width: 155px;
    height: 32px;
    line-height: 40px;
  }
}
</style>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    label: string
    option: any[]
    placeholder?: string
  }>(),
  {
    label: '',
    placeholder: '',
  },
)

const innerValue = defineModel<number>()
</script>

<template>
  <div class="label-select">
    <span class="label-select__title">{{ props.label }}：</span>
    <el-select v-model="innerValue" v-bind="$attrs" :placeholder="placeholder ? placeholder : `请选择${props.label}`" class="flex-1" clearable>
      <el-option v-for="(item, index) in props.option" :key="index" :label="item.dictLabel" :value="item.id" />
    </el-select>
  </div>
</template>

<style lang="scss" scoped>
.label-select {
  display: flex;
  align-items: center;
  color: #d5d5d5;
  background-color: #fff;
  border-radius: 4px;
  margin: 5px 15px 5px 0;
  height: 40px;
  .label-select__title {
    color: #010101;
  }

  .el-select {
    display: flex;
    align-items: center;
  }
  ::v-deep(.el-select__wrapper) {
    width: 220px;
    height: 36px;
    line-height: 40px;
  }
}
</style>

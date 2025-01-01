<script lang="ts" setup>
defineProps({
  label: {
    type: String,
    default: '',
  },
})

const innerValue = defineModel<string>()
</script>

<template>
  <div class="label-input">
    <span class="label-input__title">{{ label }}：</span>
    <el-input v-model="innerValue" style="flex: 1" :placeholder="`请输入${label}`" clearable />
  </div>
</template>

<style lang="scss" scoped>
.label-input {
  // padding: 0px 15px;
  display: flex;
  align-items: center;
  color: #d5d5d5;
  background-color: #fff;
  border-radius: 4px;
  margin: 5px 15px 5px 0;
  height: 40px;
  .label-input__title {
    color: #010101;
  }
  .pdStyle {
    padding-right: 10px;
    color: #cdcdcd;
  }

  ::v-deep(.el-input__wrapper),
  ::v-deep(.el-input__inner) {
    height: 36px;
    line-height: 40px;
    width: 220px;
    margin: auto;
  }
}
</style>

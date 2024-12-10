<script setup lang="ts">
interface Props {
  firstOptions: any[];
  secondOptions: any[];
}
defineProps<Props>();

const first = ref(undefined);
const second = defineModel<string>();
</script>

<template>
  <div class="double-select">
    <el-select placeholder="任务模板" v-model="first" :clearable="true">
      <el-option v-for="item in firstOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>

    <el-select placeholder="请选择" v-model="second" :clearable="true">
      <el-option v-for="item in secondOptions" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
  </div>
</template>

<style scoped lang="scss">
.double-select {
  display: flex;
  align-items: center;
  background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
  cursor: text;
  flex-grow: 1;
  justify-content: center;
  padding: 1px 11px;
  transform: translateZ(0);
  transition: var(--el-transition-box-shadow);

  .el-select:first-child {
    width: 130px;
    ::v-deep(.el-select__wrapper) {
      box-shadow: none !important;
      border: none;
      padding-left: 0px;
      padding-right: 0px;

      &::after {
        content: "";
        display: inline-block;
        width: 1px;
        height: 22px;
        background-color: #dcdfe6;
      }
    }
  }

  .el-select:last-child {
    width: 0;
    flex: 1;
    ::v-deep(.el-select__wrapper) {
      box-shadow: none !important;
      border: none;
      padding-right: 0px;
    }
  }
}
.el-form-item.is-error .double-select,
.el-form-item.is-error .double-select.is-focus,
.el-form-item.is-error .double-select:focus,
.el-form-item.is-error .double-select:hover {
  box-shadow: 0 0 0 1px var(--el-color-danger) inset;
}
</style>

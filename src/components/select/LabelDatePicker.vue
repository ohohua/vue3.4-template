<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    label: string
    modelValue: any
    defaultDate?: string[]
    format?: string
    valueFormat?: string
    dateFormat?: string
    timeFormat?: string
  }>(),
  {
    label: '',
    format: 'YYYY-MM-DD',
    valueFormat: 'YYYY-MM-DD',
    dateFormat: 'YYYY-MM-DD',
    timeFormat: 'hh:mm',
    defaultDate: () => [],
  },
)

const activeDate = defineModel<string[]>({ required: true })

onMounted(() => {
  activeDate.value = props.defaultDate
})
</script>

<template>
  <div class="label-picker">
    <span class="label-picker__title">{{ props.label }}：</span>
    <el-date-picker
      v-model="activeDate"
      range-separator="至"
      start-placeholder="开始时间"
      end-placeholder="结束时间"
      :format="format"
      :value-format="valueFormat"
      :date-format="dateFormat"
      v-bind="$attrs"
      clearable
    />
  </div>
</template>

<style lang="scss" scoped>
.label-picker {
  display: flex;
  align-items: center;
  color: #d5d5d5;
  background-color: #fff;
  border-radius: 4px;
  margin: 5px 15px 5px 0;
  .label-picker__title {
    color: #010101;
  }
  .pdStyle {
    color: #cdcdcd;
    font-size: 16px;
  }
  ::v-deep(.el-range-editor),
  ::v-deep(.el-input__inner) {
    height: 36px;
  }
}
</style>

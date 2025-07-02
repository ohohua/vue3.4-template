import type { Recordable } from '@/types/form'
import type { ComponentName } from '@/types/form-components'
import type { Component } from 'vue'
import DoubleSelect from '@/components/select/DoubleSelect.vue'
import UploadFile from '@/components/upload/UploadFile.vue'
import UploadImg from '@/components/upload/UploadImg.vue'
// import Text from '@/components/text/text.vue'

import {
  ElAutocomplete,
  ElCascader,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
  ElDivider,
  ElInput,
  ElInputNumber,
  ElRadioGroup,
  ElRate,
  ElSelect,
  ElSelectV2,
  ElSlider,
  ElSwitch,
  ElTimePicker,
  ElTimeSelect,
  ElTransfer,
  ElTreeSelect,
} from 'element-plus'

const componentMap: Recordable<Component, ComponentName> = {
  Radio: ElRadioGroup,
  Checkbox: ElCheckboxGroup,
  CheckboxButton: ElCheckboxGroup,
  Input: ElInput,
  Autocomplete: ElAutocomplete,
  InputNumber: ElInputNumber,
  Select: ElSelect,
  Cascader: ElCascader,
  Switch: ElSwitch,
  Slider: ElSlider,
  TimePicker: ElTimePicker,
  DatePicker: ElDatePicker,
  Rate: ElRate,
  ColorPicker: ElColorPicker,
  Transfer: ElTransfer,
  Divider: ElDivider,
  TimeSelect: ElTimeSelect,
  SelectV2: ElSelectV2,
  RadioButton: ElRadioGroup,
  TreeSelect: ElTreeSelect,
  // Text,
  UploadFile,
  UploadImg,
  DoubleSelect,
}

export { componentMap }

import type { ComponentName } from '@/types/components'
import type { Recordable } from '@/types/form'
import type { Component } from 'vue'
import DoubleSelect from '@/components/select/double-select.vue'
import Text from '@/components/text/text.vue'
import UploadFile from '@/components/upload/uploadFile.vue'

import UploadImg from '@/components/upload/uploadImg.vue'
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
  Text,
  UploadFile,
  UploadImg,
  DoubleSelect,
}

export { componentMap }

import type { Component } from "vue";
import {
  ElCascader,
  ElCheckboxGroup,
  ElColorPicker,
  ElDatePicker,
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
  ElAutocomplete,
  ElDivider,
  ElTreeSelect,
} from "element-plus";
import UploadFile from "@/components/upload/uploadFile.vue";
import UploadImg from "@/components/upload/uploadImg.vue";
import Text from "@/components/text/text.vue";
import DoubleSelect from "@/components/select/double-select.vue";
import Card from "@/views/collection/components/card.vue";
import requestHeadTable from "@/views/interface/components/requestHeadTable.vue";
import selectMenuType from "@/views/system/menu/components/selectMenuType.vue";
import reasonKeyword from "@/views/breakdown/components/reasonKeyword.vue";
import workTime from "@/views/breakdown/components/workTime.vue";

import type { ComponentName } from "@/types/components";
import type { Recordable } from "@/types/form";

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
  Text: Text,
  UploadFile: UploadFile,
  UploadImg: UploadImg,
  DoubleSelect: DoubleSelect,
  Card: Card,
  RequestHeadTable: requestHeadTable,
  SelectMenuType: selectMenuType,
  ReasonKeyword: reasonKeyword,
  WorkTime: workTime,
};

export { componentMap };

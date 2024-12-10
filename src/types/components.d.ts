import { Recordable } from "./form";

export type ComponentName =
  | "Radio"
  | "RadioButton"
  | "Checkbox"
  | "CheckboxButton"
  | "Input"
  | "Autocomplete"
  | "InputNumber"
  | "Select"
  | "Cascader"
  | "Switch"
  | "Slider"
  | "TimePicker"
  | "DatePicker"
  | "Rate"
  | "ColorPicker"
  | "Transfer"
  | "Divider"
  | "TimeSelect"
  | "SelectV2"
  | "UploadFile"
  | "TreeSelect"
  | "DoubleSelect"
  | "Card"
  | "UploadImg"
  | "RequestHeadTable"
  | "SelectMenuType"
  | "ReasonKeyword"
  | "WorkTime"
  | "Text";

export type FormValueType = string | number | string[] | number[] | boolean | undefined | null;
export type ColProps = {
  span?: number;
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  tag?: string;
};

export type ComponentOptions = {
  label?: string;
  value?: FormValueType;
  disabled?: boolean;
  key?: string | number;
  children?: ComponentOptions[];
  options?: ComponentOptions[];
} & Recordable;

export type ComponentOptionsAlias = {
  labelField?: string;
  valueField?: string;
};

export type ComponentProps = {
  optionsAlias?: ComponentOptionsAlias;
  options?: ComponentOptions[];
  optionsSlot?: boolean;
} & Recordable;

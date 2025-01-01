import type { ColProps, ComponentName, ComponentProps } from '@/types/components'
import type { CSSProperties } from 'vue'

export interface FormSetPropsType {
  field: string
  path: string | string[]
  value: any
}
export type Recordable<T = any, K extends string | number | symbol = string> = Record<K extends null | undefined ? string : K, T>
export type FormValueType = string | number | string[] | number[] | boolean | undefined | null
export type ComponentRef<T extends abstract new (...args: any) => any> = InstanceType<T>
export interface FormItemProps {
  labelWidth?: string | number
  required?: boolean
  rules?: Recordable
  error?: string
  showMessage?: boolean
  inlineMessage?: boolean
  style?: CSSProperties
  placeholder?: string
  clearable?: boolean
}

export type Nullable<T> = T | null
export interface FormSchema {
  // 唯一值
  field: string
  // 标题
  label?: string
  // 提示
  labelMessage?: string
  // col组件属性
  colProps?: ColProps
  // 表单组件属性，slots对应的是表单组件的插槽，规则：${field}-xxx，具体可以查看element-plus文档
  componentProps?: { slots?: Recordable } & ComponentProps
  // formItem组件属性
  formItemProps?: FormItemProps
  // 渲染的组件
  component?: ComponentName
  // 初始值
  value?: FormValueType
  // 是否隐藏
  hidden?: boolean
  // 远程加载下拉项
  api?: () => Promise<Result<any>>
}

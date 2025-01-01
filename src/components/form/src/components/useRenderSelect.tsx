import type { ComponentOptions } from '@/types/components'
import type { FormSchema } from '@/types/form'
import type { Slots } from 'vue'
import { getSlot } from '@/utils/tsxHelper'
import { ElOption, ElOptionGroup } from 'element-plus'

export function useRenderSelect(slots: Slots) {
  // 渲染 select options
  const renderSelectOptions = (item: FormSchema) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField

    return item.componentProps?.options?.map((option: { [x: string]: string | undefined, options?: any }) => {
      if (option?.options?.length) {
        return (
          <ElOptionGroup label={option[labelAlias || 'label']}>
            {() => {
              return option?.options?.map((v: any) => {
                return renderSelectOptionItem(item, v)
              })
            }}
          </ElOptionGroup>
        )
      }
      return renderSelectOptionItem(item, option)
    })
  }

  // 渲染 select option item
  const renderSelectOptionItem = (item: FormSchema, option: ComponentOptions) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    const valueAlias = item?.componentProps?.optionsAlias?.valueField

    const { label, value, ...other } = option

    return (
      <ElOption label={labelAlias ? option[labelAlias] : label} value={valueAlias ? option[valueAlias] : value} {...other} style={{ zIndex: 3000 }}>
        {{
          default: () =>
            // option 插槽名规则，{field}-option
            item?.componentProps?.optionsSlot ? getSlot(slots, `${item.field}-option`, { item: option }) : undefined,
        }}
      </ElOption>
    )
  }

  return {
    renderSelectOptions,
  }
}

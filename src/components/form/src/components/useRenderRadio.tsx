import type { FormSchema } from '@/types/form'
import type { defineComponent } from 'vue'
import { ElRadio, ElRadioButton } from 'element-plus'

export function useRenderRadio() {
  const renderRadioOptions = (item: FormSchema) => {
    // 如果有别名，就取别名
    const labelAlias = item?.componentProps?.optionsAlias?.labelField
    const valueAlias = item?.componentProps?.optionsAlias?.valueField
    const Com = (item.component === 'Radio' ? ElRadio : ElRadioButton) as ReturnType<typeof defineComponent>
    return item?.componentProps?.options?.map((option: { [x: string]: any }) => {
      return <Com label={option[labelAlias || 'value']}>{option[valueAlias || 'label']}</Com>
    })
  }

  return {
    renderRadioOptions,
  }
}

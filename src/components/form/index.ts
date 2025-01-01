import type { ComponentRef, FormSchema, FormSetPropsType, Recordable } from '@/types/form'
import type { ElForm } from 'element-plus'
import form from './src/form.vue'

export interface FormExpose {
  setValues: (data: Recordable) => void
  setProps: (props: Recordable) => void
  delSchema: (field: string) => void
  addSchema: (formSchema: FormSchema, index?: number) => void
  setSchema: (schemaProps: FormSetPropsType[]) => void
  formModel: Recordable
  getElFormRef: () => ComponentRef<typeof ElForm>
}

export { form }

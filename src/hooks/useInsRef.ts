/**
 * 通过传入组件推导 ref.value 的类型
 * @param _component 被 ref 引用的组件, 作用是让泛型参数推导类型。否则就只能通过 typeof ElForm 这样传入类型
 * @returns ref<InstanceType<T>>()
 */
export default function useInsRef<T extends abstract new (...args: any) => any>(_component?: T) {
  return ref<InstanceType<T>>()
}

/* good:
  const el = useInsRef(ElForm)
  el.value?.resetFields()

  bad:
  const el = useInsRef<typeof ElForm>()
*/

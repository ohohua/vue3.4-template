import type { DirectiveBinding, VNode } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  mounted(el: Element, binding: DirectiveBinding<() => void>, _vNode: VNode) {
    const authStore = useAuthStore()
    const { arg, value: _value } = binding

    if (arg && toValue(authStore.scope).includes(arg)) {
      // el.remove()
    }
  },
}

import type { DirectiveBinding } from 'vue'
import { useAuthStore } from '@/stores/auth'

export default {
  mounted(el: Element, binding: DirectiveBinding<() => void>) {
    const authStore = useAuthStore()
    const perms = authStore.getPerms()
    const { arg } = binding
    perms.includes(arg)
    if (!perms.includes(arg)) {
      el.remove()
    }
  },
}

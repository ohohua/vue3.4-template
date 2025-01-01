import autoAnimate from '@formkit/auto-animate'
import { onMounted, ref } from 'vue'

export default function () {
  const el = ref()

  onMounted(() => {
    autoAnimate(el.value)
  })
  return el
}

import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // pinia的数据持久化

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export { pinia }

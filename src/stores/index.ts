import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // pinia的数据持久化

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia

import setupDirective from '@/directive'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { setupStore } from './stores'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/style/theme/css-vars.scss'
import '@/style/index.scss'
import 'dayjs/locale/zh-cn'

const app = createApp(App)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

setupStore(app)
setupDirective(app)
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')

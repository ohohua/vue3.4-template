import type { App } from 'vue'
import vHas from './vHas'

export default function (app: App<Element>) {
  // 按钮权限校验指令
  app.directive('has', vHas)
}

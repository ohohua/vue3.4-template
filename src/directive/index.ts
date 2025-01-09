import type { App } from 'vue'
import vAuth from './vAuth'

export default function (app: App<Element>) {
  // 按钮权限校验指令
  app.directive('auth', vAuth)
}

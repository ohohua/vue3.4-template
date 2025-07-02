import type { UserInfo } from '@/types'
import { defaultRoute, errorRoute } from '@/router/routes'
import { convertMenu, generateRoutes } from '@/router/utils'
import { defineStore } from 'pinia'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  // 定义状态变量
  const token = ref<string | null>(localStorage.getItem('token'))
  const scope = ref<any[]>(JSON.parse(localStorage.getItem('scope') as string))
  const isAddRoute = ref(false)
  const userInfo = reactive<UserInfo>(Object.assign({ username: undefined }, JSON.parse(localStorage.getItem('userInfo') as string)))

  // 菜单路由和隐藏路由
  const routerMenu = computed(() => generateRoutes(convertMenu(scope.value as any[])))

  // 存 localStorage
  function addAllRouter() {
    localStorage.setItem('routerMenu', JSON.stringify(routerMenu.value))
    addRouteFromStorage()
  }

  // 将后端路由添加到vue-router中
  async function addRouteFromStorage() {
    isAddRoute.value = true

    // 后端路由
    defaultRoute.children.push(...(routerMenu.value as any))
    router.addRoute(defaultRoute)

    // 错误路由
    errorRoute.forEach((item) => {
      router.addRoute(item)
    })
  }

  // 设置数据并同步到localStorage
  function setData(data: { token: string, menu: any[] }) {
    const { token: newToken, menu: newScope } = data
    token.value = newToken
    scope.value = newScope

    // 同步到 localStorage 实现信息持久化保存
    localStorage.setItem('token', newToken)
    localStorage.setItem('scope', JSON.stringify(newScope))
  }

  // 设置用户信息
  function setCheckTokenData(ui: Partial<UserInfo>) {
    Object.assign(userInfo, ui)
    // 如果需要，可以同步到 localStorage
    localStorage.setItem('userInfo', JSON.stringify(userInfo))
  }

  // 获取存储的数据
  function getData() {
    return {
      token: token.value,
      scope: scope.value,
    }
  }

  // 获取用户信息
  function getCheckTokenData() {
    return userInfo
  }

  // 获取 token
  function getToken() {
    return token.value
  }

  // 获取 scope
  function getScope() {
    return String(scope.value)
  }

  // 删除 token 及相关数据
  function deleteToken() {
    token.value = null
    scope.value = []

    // 从 localStorage 删除
    localStorage.removeItem('token')
    localStorage.removeItem('scope')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('expiredAt')
    localStorage.removeItem('routes')
    localStorage.removeItem('userInfo')
    sessionStorage.removeItem('tabs')
  }

  function getMenuUrlsByType(data: any, type = 2) {
    const urls = [] as any
    function traverse(node: any) {
      if (node.menuType === type) {
        urls.push(node.url)
      }
      if (node.children && node.children.length > 0) {
        node.children.forEach((child: any) => traverse(child))
      }
    }
    // 遍历整个菜单结构
    if (Array.isArray(data)) {
      data.forEach(item => traverse(item))
    }
    else {
      traverse(data)
    }
    return urls
  }

  function getPerms() {
    return getMenuUrlsByType(scope.value)
  }
  return {
    isAddRoute,
    token,
    scope,
    userInfo,
    routerMenu,
    setData,
    setCheckTokenData,
    getData,
    getCheckTokenData,
    getToken,
    getScope,
    deleteToken,
    addAllRouter,
    addRouteFromStorage,
    getPerms,
  }
})

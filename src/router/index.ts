import { useAuthStore } from '@/stores/auth'
import { close, start } from '@/utils/nprogress'
import { createRouter, createWebHistory } from 'vue-router'
import { defaultRoute } from './routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      redirect: '/login',
      children: [
        {
          path: '/login',
          name: 'loginPwd',
          component: () => import('@/views/login/LoginPwd.vue'),
          meta: { title: '密码登录' },
        },
      ],
    },
    defaultRoute,
  ],
})

/* 全局前置守卫 */
router.beforeEach(async (to, from, next) => {
  start() // 开启进度条
  const authStore = useAuthStore()

  if (to.path === '/login') {
    return next()
  }
  if (to.path !== '/login' && !authStore.token) {
    return next({ path: '/login' })
  }
  if (authStore.isAddRoute) {
    return next()
  }

  authStore.addRouteFromStorage()
  const redirectPath = from.query.redirect || to.path
  const redirect = decodeURIComponent(redirectPath as string)
  const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect }
  next(nextData)
})

/* 全局后置守卫 */
router.afterEach((to) => {
  close() // 关闭进度条
  document.title = (`vue3.4-template-${to.meta.title}`) as string
})

export default router

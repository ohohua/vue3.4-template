export const baseRouter: any[] = [
  {
    path: '/system',
    name: 'system',
    meta: { title: '系统管理', icon: 'setting.png' },
    redirect: '/system/user',
    children: [
      {
        path: '/system/user',
        name: 'user',
        component: () => import('@/views/system/user/index.vue'),
        meta: { title: '人员管理', icon: '' },
      },
      {
        path: '/system/dict',
        name: 'dict',
        component: () => import('@/views/system/dict/index.vue'),
        meta: { title: '字典管理', icon: '' },
      },
      {
        path: '/system/log',
        name: 'log',
        component: () => import('@/views/system/log/index.vue'),
        meta: { title: '系统日志管理', icon: '' },
      },
      {
        path: '/system/menu',
        name: 'menu',
        component: () => import('@/views/system/menu/index.vue'),
        meta: { title: '菜单管理', icon: '' },
      },
      {
        path: '/system/role',
        name: 'role',
        component: () => import('@/views/system/role/index.vue'),
        meta: { title: '角色管理', icon: '' },
      },
    ],
  },
]
/**
 * 错误路由
 */
export const errorRoute = [
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/admin/404.vue'),
    meta: { title: '404' },
  },
]
/**
 * 业务路由
 */
export const defaultRoute
  // 后台业务
  = {
    path: '/admin',
    name: 'admin',
    redirect: '/home', // 重定向至后台首页
    component: () => import('@/views/admin/admin.vue'),
    children: [
      {
        path: '/home',
        name: 'adminHome',
        component: () => import('@/views/admin/home/home.vue'),
        meta: { title: '首页', icon: 'House' },
      },
      ...baseRouter,
    ],
  }

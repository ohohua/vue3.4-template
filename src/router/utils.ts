import type { Login } from '@/api/login/login'
import type { AppRouteRecordRaw } from '@/types/router'
// import { routes as localRoutes } from "@/router/routes";

const modules = import.meta.glob('../views/**/*.{vue,tsx}')

function getParentLayout() {
  return () =>
    new Promise((resolve) => {
      resolve({
        name: 'ParentLayout',
      })
    })
}

const Layout = () => import('@/views/admin/admin.vue')

/**
 * 处理后端路由，仅处理了2层
 */
function convertMenu(sysMenus: Login.Menu[]) {
  const newSysMenus = sysMenus.map((it, index) => ({
    id: it.id,
    path: it.url,
    name: `menu${index}`,
    component: it.webComponent,
    parentId: it.parentId,
    sort: it.sort,
    menuType: it.menuType,
    meta: {
      title: it.menuName,
      icon: it.icon,
      hidden: !!it.hidden,
    },
  }))
  const parentNodeList = newSysMenus.filter(it => !it.parentId).sort((a, b) => a.sort - b.sort)

  parentNodeList.forEach((it: any) => {
    const children = newSysMenus.filter(menu => it.id === menu.parentId)
    it.children = children.sort((prev, next) => prev.sort - next.sort)
  })

  return parentNodeList
}

// 后端控制路由生成
function generateRoutes(routes: any[]): AppRouteRecordRaw[] {
  const res: AppRouteRecordRaw[] = []

  for (const route of routes) {
    const data: AppRouteRecordRaw = {
      path: route.path,
      name: route.name,
      redirect: route.redirect,
      meta: route.meta,
    }
    if (route.component) {
      const comModule = modules[`../${route.component}.vue`] || modules[`../${route.component}.tsx`]
      const component = route.component as string
      if (!comModule && !component.includes('#')) {
        console.error(`未找到${route.component}.vue文件或${route.component}.tsx文件，请创建`)
      }
      else {
        // 动态加载路由文件，可根据实际情况进行自定义逻辑
        // data.component = component === "#" ? Layout : component.includes("##") ? getParentLayout() : comModule;
        data.component = component === '#' ? comModule : component.includes('##') ? getParentLayout() : comModule
      }
    }
    // recursive child routes
    if (route.children) {
      data.children = generateRoutes(route.children)
    }
    res.push(data as AppRouteRecordRaw)
  }

  return res
}

export { convertMenu, generateRoutes, getParentLayout, Layout }

import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import { close, start } from "@/utils/nprogress";
import { baseRouter, defaultRoute } from "./routes";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login",
    },
    {
      path: "/login",
      name: "login",
      redirect: "/login",
      children: [
        {
          path: "/login",
          name: "loginPwd",
          component: () => import("@/views/login/loginPwd.vue"),
          meta: { title: "密码登录" },
        },
      ],
    },
    defaultRoute,
  ],
});

/* 全局前置守卫 */
router.beforeEach(async (to, from, next) => {
  start(); // 开启进度条
  const authStore = useAuthStore();

  if (to.path === "/login") {
    return next();
  }
  if (to.path !== "/login" && !authStore.token) {
    return next({ path: "/login" });
  }
  if (authStore.isAddRoute) {
    return next();
  }

  authStore.addRouteFromStorage();
  const redirectPath = from.query.redirect || to.path;
  const redirect = decodeURIComponent(redirectPath as string);
  const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
  next(nextData);
});

/* 全局后置守卫 */
router.afterEach((to) => {
  close(); //关闭进度条
  document.title = ("车载数据处理存储平台数据采集系统-" + to.meta.title) as string;
});

export default router;

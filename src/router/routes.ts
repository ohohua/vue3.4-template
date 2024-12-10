export const baseRouter = [
  {
    path: "/collection",
    name: "collection",
    meta: { title: "数据采集管理", icon: "collection.png" },
    redirect: "/collection/task",
    children: [
      {
        path: "/collection/task",
        name: "task",
        component: () => import("@/views/collection/task/index.vue"),
        meta: { title: "采集任务管理", icon: "" },
      },
      {
        path: "/collection/template",
        name: "template",
        component: () => import("@/views/collection/template/index.vue"),
        meta: { title: "任务模板管理", icon: "" },
      },
    ],
  },
  {
    path: "/collection-custom",
    name: "collection-custom",
    meta: { title: "数据采集表自定义", icon: "collection-custom.png" },
    component: () => import("@/views/collection-custom/index.vue"),
  },
  {
    path: "/collection-modus",
    name: "collection-modus",
    meta: { title: "工作步骤", icon: "", hidden: true },
    component: () => import("@/views/collection-custom/indexModus.vue"),
  },
  {
    path: "/breakdown",
    name: "breakdown",
    meta: { title: "故障管理", icon: "breakdown.png" },
    component: () => import("@/views/breakdown/index.vue"),
  },
  {
    path: "/breakdown-deal",
    name: "breakdownDeal",
    meta: { title: "故障处理", icon: "", hidden: true },
    component: () => import("@/views/breakdown/indexDeal.vue"),
  },
  {
    path: "/dispose",
    name: "dispose",
    meta: { title: "数据处理", icon: "dispose.png" },
    component: () => import("@/views/dispose/index.vue"),
  },
  {
    path: "/classify",
    name: "classify",
    meta: { title: "数据分类管理", icon: "classify.png" },
    component: () => import("@/views/classify/index.vue"),
  },
  {
    path: "/log",
    name: "terminalLog",
    component: () => import("@/views/log/index.vue"),
    meta: { title: "终端日志管理", icon: "terminalLog.png" },
  },
  {
    path: "/file",
    name: "file",
    meta: { title: "资料管理", icon: "file.png" },
    redirect: "/file/doc",
    children: [
      {
        path: "/file/doc",
        name: "doc",
        component: () => import("@/views/file/doc/index.vue"),
        meta: { title: "资料文件管理", icon: "" },
      },
      {
        path: "/file/data",
        name: "data",
        component: () => import("@/views/file/data/index.vue"),
        meta: { title: "基础数据包管理", icon: "" },
      },
    ],
  },
  {
    path: "/interface",
    name: "interface",
    component: () => import("@/views/interface/index.vue"),
    meta: { title: "数据接口管理", icon: "interface.png" },
  },
  {
    path: "/facility",
    name: "facility",
    meta: { title: "装设备管理", icon: "facility.png" },
    redirect: "/facility/airplane",
    children: [
      {
        path: "/facility/airplane",
        name: "airplane",
        component: () => import("@/views/facility/airplane/index.vue"),
        meta: { title: "飞机管理", icon: "" },
      },
      {
        path: "/facility/terminal",
        name: "terminal",
        component: () => import("@/views/facility/terminal/index.vue"),
        meta: { title: "终端设备管理", icon: "" },
      },
    ],
  },

  {
    path: "/system",
    name: "system",
    meta: { title: "系统管理", icon: "setting.png" },
    redirect: "/system/user",
    children: [
      {
        path: "/system/user",
        name: "user",
        component: () => import("@/views/system/user/index.vue"),
        meta: { title: "人员管理", icon: "" },
      },
      {
        path: "/system/dict",
        name: "dict",
        component: () => import("@/views/system/dict/index.vue"),
        meta: { title: "字典管理", icon: "" },
      },
      {
        path: "/system/log",
        name: "log",
        component: () => import("@/views/system/log/index.vue"),
        meta: { title: "系统日志管理", icon: "" },
      },
      {
        path: "/system/config",
        name: "config",
        component: () => import("@/views/system/config/index.vue"),
        meta: { title: "配置管理", icon: "" },
      },
      {
        path: "/system/version",
        name: "version",
        component: () => import("@/views/system/version/index.vue"),
        meta: { title: "版本管理", icon: "" },
      },
      {
        path: "/system/menu",
        name: "menu",
        component: () => import("@/views/system/menu/index.vue"),
        meta: { title: "菜单管理", icon: "" },
      },
      {
        path: "/system/role",
        name: "role",
        component: () => import("@/views/system/role/index.vue"),
        meta: { title: "角色管理", icon: "" },
      },
    ],
  },
];
/**
 * 错误路由
 */
export const errorRoute = [
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/views/exception/404.vue"),
    meta: { title: "404" },
  },
  {
    path: "/exception/403",
    name: "Forbidden",
    component: () => import("@/views/exception/403.vue"),
    meta: { title: "403" },
  },
  {
    path: "/exception/500",
    name: "ServerError",
    component: () => import("@/views/exception/500.vue"),
    meta: { title: "500" },
  },
];
/**
 * 业务路由
 */
export const defaultRoute =
  // 后台业务
  {
    path: "/admin",
    name: "admin",
    redirect: "/home", //重定向至后台首页
    component: () => import("@/views/admin/admin.vue"),
    children: [
      {
        path: "/home",
        name: "adminHome",
        component: () => import("@/views/admin/home/home.vue"),
        meta: { title: "首页", icon: "House" },
      },
      ...baseRouter,
    ],
  };

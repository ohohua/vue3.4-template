<script setup lang="ts">
import { baseRouter } from '@/router/routes'
import { useAuthStore } from '@/stores/auth'
import { useCollapseStore } from '@/stores/collapse'
import { getAssetsFile } from '@/utils'
import { useRoute, useRouter } from 'vue-router'
import '@/types/global.d.ts'

const authStore = useAuthStore()
const collapseStore = useCollapseStore()
const router = useRouter()
const route = useRoute()

const baseRouteFilter = computed(() => baseRouter.filter(item => !item.meta.hidden))
const active = ref(route.name as string)

/* 路由跳转函数 */
function jumpRoute(item: any) {
  router.push({ name: item.name })
}

// 监听路由变化，更新激活菜单项
watch(route, (newRoute) => {
  active.value = newRoute.name as string
})
</script>

<template>
  <div class="relative overflow-hidden aside-main">
    <el-scrollbar>
      <!-- 侧边导航菜单 -->
      <el-menu
        :default-active="active"
        class="transition-all duration-300 ease-in-out aside-menu"
        :collapse="collapseStore.isCollapse"
        text-color="#ffffff"
        active-text-color="#FFFFFF"
        :unique-opened="true"
      >
        <!-- 遍历一级菜单 -->

        <!-- <template v-for="item in authStore.routerMenu" :key="item.path"> -->
        <template v-for="item in baseRouteFilter" :key="item.path">
          <!-- 判断是否有二级菜单 -->
          <el-sub-menu v-if="item.children && item.children.length" :index="item.path">
            <template #title>
              <img :src="getAssetsFile(item.meta.icon)" alt="icon" class="mr-[12px]">
              <!-- <el-icon> -->
              <!-- <component :is="item.meta.icon" /> -->
              <!-- </el-icon> -->
              <span v-if="!collapseStore.isCollapse">{{ item.meta.title }}</span>
            </template>
            <!-- 遍历二级菜单项 -->
            <el-menu-item v-for="subItem in item.children" :key="subItem.path" :index="subItem.name" @click="jumpRoute(subItem)">
              <!-- <el-icon>
                <component :is="subItem.meta.icon" />
              </el-icon> -->
              {{ subItem.meta.title }}
            </el-menu-item>
          </el-sub-menu>

          <!-- 没有二级菜单 -->
          <el-menu-item v-else :index="item.name" @click="jumpRoute(item)">
            <img :src="getAssetsFile(item.meta.icon)" alt="icon" class="mr-[12px]">
            <!-- <el-icon>
              <component :is="item.meta.icon" />
            </el-icon> -->
            <span v-if="!collapseStore.isCollapse">{{ item.meta.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>

      <!-- 切换侧边栏缩放 -->
      <!-- <div
        class="absolute flex items-center w-full transition-all right-1 bottom-10 duration-600 ease"
        :style="{
          justifyContent: collapseStore.isCollapse ? 'center' : 'flex-end',
        }"
      >
        <el-tooltip content="折叠" placement="bottom" v-if="!collapseStore.isCollapse">
          <div class="cursor-pointer toggle-button" @click="collapseStore.toggleCollapse">
            <el-icon size="22px">
              <Fold />
            </el-icon>
          </div>
        </el-tooltip>
        <el-tooltip content="展开" placement="bottom" v-else>
          <div class="cursor-pointer toggle-button" @click="collapseStore.toggleCollapse">
            <el-icon size="22px">
              <Expand />
            </el-icon>
          </div>
        </el-tooltip>
      </div> -->
    </el-scrollbar>
  </div>
</template>

<style lang="scss" scoped>
.aside-main {
  height: calc(100vh - 80px);
}

.aside-menu {
  border-right: 0;
}
:deep(.el-scrollbar) {
  background-color: #083454;
  .el-scrollbar__view {
    height: 100%;
    padding: 0 15px;
  }
}
:deep(.el-menu) {
  background-color: #083454;
  border: none;

  .el-menu-item {
    color: #fff;
    &:hover {
      background-color: #0d7bca;
      border-radius: 4px;
    }
  }
  .el-sub-menu__title {
    color: #fff !important;
    background-color: #083454;
    &:hover {
      background-color: #0d7bca;
      border-radius: 4px;
    }
  }
  .is-active {
    color: #ffffff;
    background-color: #0d7bca;
    border-radius: 4px;
    > span {
      font-weight: 600;
    }

    > img {
      filter: brightness(1.5);
    }
  }
}
</style>

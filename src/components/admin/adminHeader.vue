<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
// import theme from "@/components/theme.js";
import { ArrowDown } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

// 获取用户信息
async function receiveUserInfo() {}

// 登出
async function toLogout() {
  authStore.deleteToken()
  router.replace({ name: 'login' })
}
// 用于面包屑
// const breadcrumbRoutes = computed(() => {
//   return route.matched.filter((item) => item.meta && item.meta.title);
// });
onMounted(() => {
  receiveUserInfo()
})
</script>

<template>
  <div class="flex items-center justify-between h-[80px]">
    <div class="flex items-center header-left">
      <!-- <img src="https://element-plus.org/images/element-plus-logo.svg" alt="Logo" class="h-10" /> -->
      <div class="avatar mr-2.5">
        <!-- <el-avatar :src="userInfo.avatar" /> -->
      </div>
      <h2 class="text-2xl text-white">
        vue3.4-template
      </h2>
      <!-- 头部面包屑 -->
      <!-- <el-breadcrumb class="ml-6">
        <el-breadcrumb-item v-for="item in breadcrumbRoutes" :key="item.name" :to="{ name: item?.name }" class="text-base">
          {{ item?.meta?.title }}
        </el-breadcrumb-item>
      </el-breadcrumb> -->
    </div>
    <div class="flex items-center header-right">
      <!-- 下拉菜单 -->
      <el-dropdown placement="bottom-end" trigger="click">
        <span class="flex items-center w-full text-white outline-none cursor-pointer">
          {{ authStore.getCheckTokenData().username }}
          <el-icon size="12px" class="ml-1"><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout" @click="toLogout">
              <i class="text-lg" /> 登出
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>

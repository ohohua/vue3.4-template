<script lang="ts" setup>
import type { InfoLogin, PasswordLogin } from '@/types'
import type { TabPaneName } from 'element-plus'
// import { infoLogin, login } from '@/api'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import FlexibleInput from './FlexibleInput.vue'

const authStore = useAuthStore()
const router = useRouter()
const type = ref<TabPaneName>(localStorage.getItem('type') || 'first')
const loading = ref(false)

function handleTabChange(type: TabPaneName) {
  localStorage.setItem('type', type as string)
}

/** 个人信息登录 */
const loginUserInfoForm = reactive<InfoLogin>(
  Object.assign(
    {
      unit: undefined,
      job: undefined,
      name: undefined,
      password: undefined,
      remember: false,
    },
    JSON.parse(localStorage.getItem('loginUserInfoForm') as string),
  ),
)

async function onSubmitWithInfo() {
  if (!canSubmitWithInfo.value && !loading.value)
    return

  try {
    loading.value = true
    // const { data } = await infoLogin(loginUserInfoForm)
    // const { token, username, menuList } = data || {}
    // authStore.setData({ token, menu: menuList })
    // authStore.setCheckTokenData({ username })
    authStore.addAllRouter()

    if (loginUserInfoForm.remember) {
      delete loginUserInfoForm.password
      localStorage.setItem('loginUserInfoForm', JSON.stringify(loginUserInfoForm))
    }
    else {
      localStorage.removeItem('loginUserInfoForm')
    }
    await router.replace({ name: 'admin' })
  }
  finally {
    loading.value = false
  }
}

const canSubmitWithInfo = computed(() => {
  return true
  // const { orgId, job, realname, password } = loginUserInfoForm
  // return Boolean(orgId && job != null && realname && password)
})

/** 用户名登录 */
const loginUsernameForm = reactive<PasswordLogin>(
  Object.assign(
    {
      username: 'admin',
      password: '123456',
      remember: false,
    },
    JSON.parse(localStorage.getItem('loginUsernameForm') as string),
  ),
)

async function onSubmitWithName() {
  if (!canSubmitWithName.value && !loading.value)
    return

  try {
    loading.value = true

    // const { data } = await login(loginUsernameForm)
    // const { menuList } = data || {}
    // authStore.setData({ token: data.token, menu: menuList })
    // authStore.setCheckTokenData({ username: data.username })
    // authStore.addAllRouter()

    if (loginUsernameForm.remember) {
      delete loginUsernameForm.password
      localStorage.setItem('loginUsernameForm', JSON.stringify(loginUsernameForm))
    }
    else {
      localStorage.removeItem('loginUsernameForm')
    }
    await router.replace({ name: 'admin' })
  }
  finally {
    loading.value = false
  }
}

const canSubmitWithName = computed(() => {
  const { username, password } = loginUsernameForm
  return Boolean(username && password)
})
</script>

<template>
  <div class="flex items-center justify-around h-full login-page">
    <h2 class="mb-20 text-5xl font-bold text-left h-[544px] pt-[40px] leading-normal max-xl:hidden">
      title
      <br>
      subtitle
    </h2>
    <div class="overflow-hidden login-container">
      <div class="p-4 form-container">
        <el-tabs v-model="type" stretch @tab-change="handleTabChange">
          <el-tab-pane label="用户名登录" name="first">
            <el-form class="h-[330px]" @keydown.enter="onSubmitWithName">
              <FlexibleInput
                v-model="loginUsernameForm.username" placeholder="用户名" :password="false"
                class="mb-[20px]"
              />
              <FlexibleInput v-model="loginUsernameForm.password" placeholder="密码" password />
              <el-checkbox v-model="loginUsernameForm.remember" label="记住用户名" size="large" />
              <el-button
                type="primary" size="large" class="w-full py-2 text-lg mt-[30px]"
                :disabled="!canSubmitWithName" :loading="loading" @click="onSubmitWithName"
              >
                登录
              </el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="快捷登录 " name="second">
            <el-form class="h-[330px]" @keydown.enter="onSubmitWithInfo">
              <el-button
                type="primary" size="large" class="w-full py-2 text-lg mt-[30px]"
                :disabled="!canSubmitWithInfo" :loading="loading" @click="onSubmitWithInfo"
              >
                登录
              </el-button>
            </el-form>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-page {
  &>h2 {
    text-shadow: 3px -3px 2px rgba(0, 0, 0, 0.3);
  }

  .login-container {
    background-color: rgba(#eef4ff, 0.9);
    padding: 40px;
    width: 440px;
    border-radius: 15px;
    background-size: cover;
    background-image: url("@/assets/images/login_bg_container.png");

    .form-container {
      opacity: 1;
    }
  }

  :deep(.el-tabs) {
    .el-tabs__active-bar {
      background-color: #0061ff;
    }

    .el-tabs__nav-wrap::after {
      background-color: #fff;
    }

    .el-tabs__item {
      font-size: 16px;
      font-weight: bold;
      color: #b8bbbe;
    }

    .is-active {
      color: #0061ff;
    }
  }

  :deep(.el-checkbox) {
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: #0061ff;
    }

    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: #0061ff;
    }
  }

  .el-button {
    background-color: #0061ff;

    &:hover {
      filter: brightness(1.2);
    }
  }
}
</style>

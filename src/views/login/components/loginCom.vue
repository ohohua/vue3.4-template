<script lang="ts" setup>
// import theme from "@/components/theme";
import type { InfoLogin, PasswordLogin } from '@/types'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import flexibleInput from './flexibleInput.vue'
import flexibleSelect from './flexibleSelect.vue'

const authStore = useAuthStore()
const router = useRouter()
const type = ref('first')
const loading = ref(false)

const unitOptions = ref([
  {
    label: 'xx中队1',
    value: 1,
  },
  {
    label: 'xx中队2',
    value: 2,
  },
])
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

const canSubmitWithInfo = computed(() => {
  const { unit, job, name, password } = loginUserInfoForm
  return Boolean(unit && job && name && password)
})

/** 用户名登录 */
const loginUsernameForm = reactive<PasswordLogin>(
  Object.assign(
    {
      username: undefined,
      password: undefined,
      remember: false,
    },
    JSON.parse(localStorage.getItem('loginUsernameForm') as string),
  ),
)
async function onSubmitWithInfo() {
  if (!canSubmitWithInfo.value && !loading.value)
    return

  try {
    loading.value = true
    // const { data } = await login(loginUsernameForm);
    // const { token, username, sysMenus } = data || {};
    const token = '123'
    authStore.setData({ token, menu: [] })
    authStore.setCheckTokenData({ username: '123' })
    authStore.addAllRouter()

    if (loginUserInfoForm.remember) {
      delete loginUserInfoForm.password
      localStorage.setItem('loginUserInfoForm', JSON.stringify(loginUserInfoForm))
    }
    else {
      localStorage.removeItem('loginUserInfoForm')
    }
    router.replace({ name: 'admin' })
  }
  finally {
    loading.value = false
  }
}

const canSubmitWithName = computed(() => {
  const { username, password } = loginUsernameForm
  return Boolean(username && password)
})

async function onSubmitWithName() {
  if (!canSubmitWithName.value && !loading.value)
    return

  try {
    loading.value = true
    // const { data } = await login(loginUsernameForm);
    // const { token, sysMenus, username } = data || {};
    const token = '123'
    const username = 'admin'
    authStore.setData({ token, menu: [] })
    authStore.setCheckTokenData({ username })
    authStore.addAllRouter()

    if (loginUsernameForm.remember) {
      delete loginUsernameForm.password
      localStorage.setItem('loginUsernameForm', JSON.stringify(loginUsernameForm))
    }
    else {
      localStorage.removeItem('loginUsernameForm')
    }
    router.replace({ name: 'admin' })
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <h2 class="mb-20 text-5xl font-bold text-center">
      vue3.4-template
    </h2>
    <div class="flex overflow-hidden login-container">
      <div class="p-4 form-container w-[400px] m-auto">
        <el-tabs v-model="type" stretch>
          <el-tab-pane label="个人信息登录" name="first">
            <!-- 表单主体 -->
            <el-form class="h-[330px]" @keydown.enter="onSubmitWithInfo">
              <flexible-select v-model="loginUserInfoForm.unit" placeholder="单位" :options="unitOptions" />
              <flexible-select v-model="loginUserInfoForm.job" placeholder="职务" :options="unitOptions" />
              <flexible-input v-model="loginUserInfoForm.name" placeholder="姓名" :password="false" />
              <flexible-input v-model="loginUserInfoForm.password" placeholder="密码" password />
              <el-checkbox v-model="loginUserInfoForm.remember" label="记住个人信息" size="large" />
              <el-button type="primary" size="large" class="w-full py-2 text-lg" :disabled="!canSubmitWithInfo" :loading="loading" @click="onSubmitWithInfo">
                登录
              </el-button>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="用户名登录" name="second">
            <!-- 表单主体 -->
            <el-form class="h-[330px]" @keydown.enter="onSubmitWithName">
              <flexible-input v-model="loginUsernameForm.username" placeholder="用户名" :password="false" />
              <flexible-input v-model="loginUsernameForm.password" placeholder="密码" password />
              <el-checkbox v-model="loginUsernameForm.remember" label="记住用户名" size="large" />
              <el-button type="primary" size="large" class="w-full py-2 text-lg" :disabled="!canSubmitWithName" :loading="loading" @click="onSubmitWithName">
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
  width: 100%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  :deep(.el-tabs) {
    .el-tabs__nav-wrap::after {
      display: none;
    }
  }
  :deep(.el-checkbox) {
    .el-checkbox__inner {
      background-color: transparent;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner {
      background-color: var(--el-checkbox-checked-bg-color);
      border-color: var(--el-checkbox-checked-input-border-color);
    }
  }
}
</style>

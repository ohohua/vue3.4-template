<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const date = ref(new Date())

// 定义 greet 方法
const greet = computed(() => {
  const hours = new Date().getHours()
  const name = authStore.userInfo.username
  if (hours >= 5 && hours < 9) {
    return `早上好${name}，今天又是充满活力的一天！`
  }
  else if (hours >= 9 && hours < 12) {
    return `上午好${name}，保持元气满满哦！`
  }
  else if (hours >= 12 && hours < 14) {
    return `中午好${name}，记得吃午饭哦！`
  }
  else if (hours >= 14 && hours < 18) {
    return `下午好${name}，今天的工作顺利吗？`
  }
  else if (hours >= 18 && hours < 21) {
    return `傍晚好${name}，工作辛苦了,放松一下吧！`
  }
  else if (hours >= 21 && hours < 23) {
    return `晚上好${name}，今天过得怎么样？`
  }
  else {
    return `夜深了${name}，该休息了，晚安！`
  }
})
</script>

<template>
  <div class="home">
    <div class="mb-2 bg-white rounded welcome">
      <el-card class="relative flex flex-col items-center justify-center h-64 bg-center bg-no-repeat bg-contain bg-welcome-bg" shadow="hover">
        <div class="card-content absolute left-2.5 top-2.5 p-2.5 rounded">
          <p class="text-xl font-semibold">
            {{ greet }}
          </p>
        </div>
      </el-card>
    </div>

    <div class="flex w-full gap-1 data-visual">
      <el-calendar v-model="date" class="border border-gray-200 rounded calendar-date">
        <template #date-cell="{ data }">
          <p :class="data.isSelected ? 'is-selected' : ''">
            {{ data.day.split("-").slice(1).join("-") }}
            {{ data.isSelected ? "✔️" : "" }}
          </p>
        </template>
      </el-calendar>
    </div>
  </div>
</template>

<template>
  <div class="w-full h-[40px] border-b border-l border-solid gvb-tabs border-b-gray-500/20 border-l-gray-500/20">
    <div class="flex items-center justify-between h-[40px] tabs-container">
      <div class="tabs-header">
        <el-tabs v-model="activeValue" type="card" @tab-remove="removeTab" @tab-click="changeTab">
          <el-tab-pane v-for="item in tabs" :key="item.name" :label="item.title" :name="item.name" :closable="!item.fixed">
            <template #label>
              <span :class="activeValue === item.name ? 'text-active' : 'text-normal'">
                {{ item.title }}
              </span>
            </template>
          </el-tab-pane>
        </el-tabs>
      </div>
      <el-button @click="removeAllTabs" link class="mr-2" :icon="Delete">全部删除</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { TabPaneName } from "element-plus";
import { Delete } from "@element-plus/icons-vue";

interface TabType {
  name: string;
  title: string;
  query?: Record<string, string | number>;
  fixed?: boolean;
}

const route = useRoute();
const router = useRouter();

const defaultTabs: TabType[] = [{ name: "adminHome", title: "首页", fixed: true }];

const tabs = ref<TabType[]>([]);

// 激活样式所在的路由
const activeValue = ref<string>(route.name as string);

// 监听路由变化，更新 activeValue 和标签页
watch(route, (newRoute) => {
  const routeName = newRoute.name as string;
  const routeTitle = newRoute.meta.title as string;
  const routeQuery = newRoute.query;
  activeValue.value = routeName;
  addTab(routeName, routeTitle, routeQuery);
  saveTabsToSessionStorage();
});

// 点击标签页后进行路由跳转
const changeTab = (tab: { paneName: any }) => {
  const { name, query } = tabs.value.find((item) => item.name === tab.paneName) || {};
  router.push({ name, query });
};

// 删除标签页
const removeTab = (targetName: TabPaneName) => {
  const index = tabs.value.findIndex((tab) => tab.name === targetName);

  if (index !== -1 && !tabs.value[index].fixed) {
    tabs.value.splice(index, 1);

    if (activeValue.value === targetName) {
      const newIndex = index === tabs.value.length ? index - 1 : index;
      if (newIndex >= 0) {
        activeValue.value = tabs.value[newIndex].name;
        router.push({ name: tabs.value[newIndex].name });
      }
    }
    saveTabsToSessionStorage();
  }
};

// 删除所有标签页
const removeAllTabs = () => {
  tabs.value = tabs.value.filter((tab) => tab.fixed);
  activeValue.value = tabs.value[0].name;
  router.push({ name: tabs.value[0].name });
  saveTabsToSessionStorage();
};

// 保存标签页到 sessionStorage
const saveTabsToSessionStorage = () => {
  sessionStorage.setItem("tabs", JSON.stringify(tabs.value));
};

// 从 sessionStorage 恢复标签页
const loadTabsFromSessionStorage = () => {
  const savedTabs = sessionStorage.getItem("tabs");
  if (savedTabs) {
    tabs.value = JSON.parse(savedTabs);
  } else {
    tabs.value = [...defaultTabs];
  }
};

// 添加标签页
const addTab = (name: string, title: string, query: any) => {
  if (!tabs.value.find((tab) => tab.name === name)) {
    tabs.value.push({ name, title, query });
  }
};

// 组件挂载时加载标签页
onMounted(() => {
  loadTabsFromSessionStorage();
  const routeName = route.name as string;
  const routeTitle = route.meta.title as string;
  const routeQuery = route.query;
  if (!tabs.value.find((tab) => tab.name === routeName)) {
    addTab(routeName, routeTitle, routeQuery);
  }
  activeValue.value = routeName;
  saveTabsToSessionStorage();
});

defineExpose({ removeTab });
</script>

<style lang="scss" scoped>
.gvb-tabs {
  background-color: #073a60;
  .tabs-header {
    height: 40px;
    overflow-x: auto;
    white-space: nowrap;
    max-width: calc(100% - 100px); // Adjust based on your layout
  }

  ::v-deep(.el-tabs__nav-scroll) {
    padding: 4px 4px;
  }

  ::v-deep(.el-tabs__nav) {
    border: 0;
  }

  ::v-deep(.el-tabs__header) {
    border-bottom: 0;
    margin: 0;
  }
  ::v-deep(.el-tabs__nav-wrap) {
    margin-bottom: 0 !important;
    .el-tabs__nav-scroll {
      height: 40px !important;
      padding: 0;
    }
  }

  ::v-deep(.el-tabs__item) {
    box-sizing: border-box;
    border: 0;
    border-radius: 2px;
    transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
    height: 40px;
    color: #fff;
    position: relative;

    &.is-active {
      color: #2dabff;
      &::after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: #2dabff;
        top: 37px;
      }
    }
  }

  ::v-deep(.el-tabs__item):first-child {
    &.is-active {
      &::after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 100%;
        height: 3px;
        background-color: #2dabff;
        top: 37px;
      }
    }
  }
}

.text-normal {
  color: var(--tab-text-color);
}
</style>

<!-- 折叠按钮 -->
<script setup lang="ts">
import { useAttrs } from "vue";
import { ElButton, ElDropdown, ElDropdownItem } from "element-plus";
// import { ArrowDown } from '@element-plus/icons'
import Icon from "@/components/icon/icon.vue";

const attrs = useAttrs();

withDefaults(
  defineProps<{
    options: string[];
    icon?: string;
    disabled: boolean;
    isOnline?: boolean;
  }>(),
  {
    options: () => [],
    icon: "",
    disabled: true,
    isOnline: true,
  },
);
const emit = defineEmits(["callback"]);

/**
 * 点击选项
 */
const commandBtn = (val: string) => {
  emit("callback", val);
};
</script>

<template>
  <el-dropdown placement="top" :disabled="disabled" trigger="click" @command="commandBtn">
    <slot name="button">
      <el-button type="primary" v-bind="attrs" :disabled="disabled">
        <slot>更多菜单</slot>
        <Icon v-if="icon" :name="icon"></Icon>
        <!-- <el-icon v-if="!icon">
          <ArrowDown />
        </el-icon> -->
      </el-button>
    </slot>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="(o, i) in options" :key="o" :command="o" :disabled="[3, 4].includes(i) && !isOnline">{{ o }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
<style lang="scss" scoped>
.el-button {
  color: #fff;
  background-image: linear-gradient(90deg, #1a73e4, #1c8de5, #1ea9e7);
  background-repeat: no-repeat;
  background-size: 110% 110%;
  background-position: -2px 0;
  height: 40px;
  min-width: 97px;
}

.icon {
  width: 17px;
  height: 14px;
  margin: 0 5px;
}
.el-button.is-disabled,
.el-button.is-disabled:focus,
.el-button.is-disabled:hover {
  background-color: #1c8de5;
  opacity: 0.7;
}
.el-button.is-plain {
  color: #4b9aff;
  border: #4b9aff 1.5px solid;
  opacity: 1;
  background-color: #fff !important;
  background-image: none;
}

.is-plain.is-disabled,
.is-plain.is-disabled:focus,
.is-plain.is-disabled:hover {
  opacity: 0.7;
  border: #c0c6dc solid 1.5px;
  color: #c0c6dc;
  filter: grayscale(100%);
}
</style>

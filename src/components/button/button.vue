<script setup lang="ts">
import { ElButton } from "element-plus";
// import Icon from "../icon/icon.vue";
import type { EpPropMergeType } from "element-plus/es/utils/index.mjs";

type ButtonType = EpPropMergeType<StringConstructor, "" | "text" | "default" | "success" | "warning" | "info" | "primary" | "danger", unknown>;

withDefaults(
  defineProps<{
    // icon?: string;
    disabled?: boolean;
    iconUrl?: string;
    plain?: boolean;
    type?: ButtonType;
  }>(),
  {
    // icon: "",
    disabled: false,
    iconUrl: "",
    plain: false,
    type: "primary",
  },
);
</script>

<template>
  <el-button v-bind="$attrs" :type="type" :disabled="disabled" :plain="plain">
    <!-- <Icon v-if="icon" :name="icon"></Icon> -->
    <el-image v-if="iconUrl" style="width: 100px; height: 100px" :src="iconUrl" fit="cover"></el-image>
    <slot>图标按钮</slot>
  </el-button>
</template>

<style lang="scss" scoped>
.el-button {
  min-width: 97px;
  height: 36px;
  // color: #fff;
  // background-image: linear-gradient(90deg, #4c9bff, #44a8ff, #3eb7ff);
  // background-repeat: no-repeat;
  // background-size: 110% 110%;
  background-position: -2px 0;
  border: none;
}

.icon {
  width: 17px;
  height: 14px;
  margin: 0 5px;
}
// .el-button.is-disabled,
// .el-button.is-disabled:focus,
// .el-button.is-disabled:hover {
//   background-color: #1c8de5;
//   opacity: 0.7;
// }

// .el-button.is-plain {
//   color: #4b9aff;
//   border: #4b9aff 1.5px solid;
//   opacity: 1;
//   background-color: #fff !important;
//   background-image: none;
// }

// .is-plain.is-disabled,
// .is-plain.is-disabled:focus,
// .is-plain.is-disabled:hover {
//   opacity: 0.7;
//   border: #c0c6dc solid 1.5px;
//   color: #c0c6dc;
//   filter: grayscale(100%);
// }
</style>

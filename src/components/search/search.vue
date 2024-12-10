<script setup lang="ts">
import useAnimate from "@/hooks/useAnimate";
import { Search, Refresh } from "@element-plus/icons-vue";

const props = defineProps({
  localName: {
    type: String,
    default: "",
  },
  reset: {
    type: Boolean,
    default: true,
  },
  border: {
    type: Boolean,
    default: true,
  },
});

const emit = defineEmits(["callback"]);
const slots = useSlots();

const el = useAnimate();
const showSecondary = ref(JSON.parse((localStorage.getItem(`${props.localName}_secondary`) as string) || "false"));
/**
 * 回调函数
 */
const callbackFun = (type: string) => {
  emit("callback", type);
};
/**
 * 改变显示
 */
const changeShow = () => {
  showSecondary.value = !showSecondary.value;
  localStorage.setItem(`${props.localName}_secondary`, JSON.stringify(showSecondary.value));
};
</script>

<template>
  <el-form @keydown.enter="callbackFun('query')">
    <div ref="el" :class="['box', border ? 'border border-solid border-[#cfe4fa] p-[15px]' : '']">
      <slot name="main">
        <!-- <label-input label="请输入..." /> -->
      </slot>
      <slot v-if="showSecondary" name="secondary">
        <!-- <label-input label="请输入..." /> -->
      </slot>
      <Button :icon="Search" @click="callbackFun('query')">查询</Button>
      <Button :icon="Refresh" v-if="reset" @click="callbackFun('reset')">重置</Button>
      <el-button v-if="slots.secondary" link type="primary" @click="changeShow">
        {{ showSecondary ? "折叠" : "展开" }}
      </el-button>
    </div>
  </el-form>
</template>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom: 10px;
  background-color: #fff;
  // border: 1px solid #cfe4fa;
  :deep(.boxStyle) {
    margin-right: 10px;
  }
  .el-space {
    flex-wrap: wrap;
  }
}
</style>

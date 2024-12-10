<script setup lang="ts">
defineProps({
  cancel: {
    type: Boolean,
    default: false,
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  confirmText: {
    type: String,
    default: "确 定",
  },
  pos: {
    type: String,
    default: "justify-end",
    validator: (val: string) => ["justify-end", "justify-center", "justify-start"].includes(val),
  },
});

const emits = defineEmits(["cancel", "confirm"]);
const handleCancel = () => {
  emits("cancel");
};
const handleConfirm = () => {
  emits("confirm");
};
</script>

<template>
  <div :class="['footer flex items-center h-[40px] px-4 bg-[#dfe1e4]', pos]">
    <el-button v-if="cancel" plain @click="handleCancel">取 消</el-button>
    <el-button type="primary" v-if="confirm" @click="handleConfirm">{{ confirmText }}</el-button>
    <slot></slot>
  </div>
</template>

<style scoped lang="scss"></style>

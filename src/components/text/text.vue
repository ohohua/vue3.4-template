<script setup lang="ts">
const model = defineModel<string>({ default: "" });
const slot = useSlots();
</script>

<template>
  <el-text v-bind="slot">{{ model }}</el-text>
</template>

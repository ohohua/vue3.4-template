<script setup lang="ts"></script>

<template>
  <div class="bg-white dark:bg-dark box">
    <slot>内容</slot>
  </div>
</template>

<style lang="scss" scoped>
.box {
  position: relative;
  height: 100%;
  padding: 15px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  border: 1px solid #cfe4fa;
}
</style>

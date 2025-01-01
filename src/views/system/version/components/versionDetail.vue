<script setup lang="ts">
import type { Version } from '@/api/system/version/version'

defineProps<Version.List>()
</script>

<template>
  <Container class="version-detail">
    <div class="flex mb-5">
      <div>
        <label class="require">软件名称：</label>
        <span>{{ softNameStr }}</span>
      </div>
      <div>
        <label class="">版本名称：</label>
        <span>{{ versionName }}</span>
      </div>
    </div>
    <div class="mb-5">
      <label>版本描述：</label>
      <span>{{ description }}</span>
    </div>
    <div>
      <label class="require">附件：</label>
      <span>{{ fileName }}</span>
    </div>
  </Container>
</template>

<style lang="scss" scoped>
.version-detail {
  label {
    display: inline-block;
    font-weight: bold;
    width: 100px;
    text-align: right;
  }
  .require::before {
    content: "*";
    color: red;
  }
  span {
    display: inline-block;
    min-width: 200px;
  }
}
</style>

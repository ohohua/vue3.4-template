<script setup lang="ts">
import type { Dict } from '@/api/system/dict/dict'

defineProps<Dict.List>()
</script>

<template>
  <Container class="dict-detail">
    <div class="flex justify-center mb-5">
      <div>
        <label class="require">字典名称：</label>
        <span>{{ dictTypeName }}</span>
      </div>
    </div>
    <div class="flex justify-center mb-5">
      <div>
        <label class="require">字典编码：</label>
        <span>{{ dictTypeCode }}</span>
      </div>
    </div>
    <div class="flex justify-center mb-5">
      <div>
        <label class="require">描述：</label>
        <span>{{ description }}</span>
      </div>
    </div>
    <div class="flex justify-center mb-5">
      <div>
        <label>状态：</label>
        <span>{{ statusStr }}</span>
      </div>
    </div>
  </Container>
</template>

<style lang="scss" scoped>
.dict-detail {
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

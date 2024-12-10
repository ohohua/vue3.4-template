<script setup lang="ts">
import type { Log } from "@/api/system/log/log";
import search from "../composables/search";

defineProps<Log.EditOperateLogParams>();

const { searchOptions } = search(() => {});
</script>

<template>
  <Container class="log-detail">
    <div class="flex mb-5">
      <div>
        <label>操作对象：</label>
        <span>{{ operateObject }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label>操作人：</label>
        <span>{{ operateUsername }}</span>
      </div>
      <div>
        <label>操作账号：</label>
        <span>{{ operateAccount }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label>操作类型：</label>
        <span>{{ searchOptions.operateType.find((item) => item.id === operateType)?.dictLabel }}</span>
      </div>
      <div>
        <div>
          <label>日志类型：</label>
          <span>{{ searchOptions.logType.find((item) => item.id === logType)?.dictLabel }}</span>
        </div>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label>操作对象：</label>
        <span>{{ operateObject }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label>请求IP：</label>
        <span>{{ requestIp }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label>请求地址：</label>
        <span>{{ requestURL }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label>请求方式：</label>
        <span>{{ requestType }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label>请求参数：</label>
        <span>{{ requestParam }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label>操作状态：</label>
        <span>{{ searchOptions.status.find((item) => item.id === status)?.dictLabel }}</span>
      </div>
    </div>
    <div class="flex mb-5">
      <div>
        <label>操作时间：</label>
        <span>{{ createTime }}</span>
      </div>
    </div>
  </Container>
</template>

<style lang="scss" scoped>
.log-detail {
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

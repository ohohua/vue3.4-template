<script lang="ts" setup>
import LoginCom from './components/LoginCom.vue'
</script>

<template>
  <div class="h-screen login-wrapper">
    <LoginCom />
  </div>
</template>

<style lang="scss" scoped>
.login-wrapper {
  background-image: url("@/assets/images/login_bg.png");
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 10px 0;
  text-align: center;

  img {
    height: 16px;
    margin-right: 5px;
  }
}

.footerLink {
  font-size: medium;
}
</style>

<script setup lang="ts"></script>

<template>
  <div class="container relative flex h-full bg-black">
    <div class="m-auto">
      <div class="power" />
      <ul>
        <li />
        <li />
        <li />
        <li />
        <li />
        <li />
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  animation: hue 6s infinite linear;
}
.power {
  position: relative;
  &:before {
    content: "";
    display: block;
    position: absolute;
    z-index: 1;
    left: 15px;
    top: 15px;
    width: 100px;
    height: 100px;
    background-color: rgba(#000, 0.9);
    border-radius: 50%;
    filter: blur(10px);
  }
  &::after {
    content: "";
    display: block;
    width: 130px;
    height: 130px;
    border-radius: 75%/52% 52% 107% 60%;
    background-color: #0dd817;
    filter: blur(10px);
    animation: rotate 8s infinite linear;
  }
}
ul {
  margin-top: 100px;
  margin-left: 15px;
  list-style: none;
  width: 100px;
  height: 20px;
  background-color: #0dd817;
  filter: blur(6px);

  li {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
    background-color: #0dd817;
    animation: moveTop 3s infinite linear;
  }
  li:nth-child(1) {
    animation-delay: 0s;
    left: 10%;
  }
  li:nth-child(2) {
    animation-delay: 1.2s;
    left: 27%;
  }
  li:nth-child(3) {
    animation-delay: 1.9s;
    left: 17%;
  }
  li:nth-child(4) {
    animation-delay: 0.7s;
    left: 37%;
  }
  li:nth-child(5) {
    animation-delay: 2.4s;
    left: 40%;
  }
  li:nth-child(6) {
    animation-delay: 2.8s;
    left: 70%;
  }

  @keyframes hue {
    0% {
      filter: contrast(20) hue-rotate(0);
    }
    100% {
      filter: contrast(20) hue-rotate(360deg);
    }
  }
  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    50% {
      border-radius: 50% 43% 60% 48%/90%;
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes moveTop {
    0% {
      top: 0;
    }
    100% {
      top: -150px;
    }
  }
}
</style>

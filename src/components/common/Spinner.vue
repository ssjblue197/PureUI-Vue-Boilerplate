<template>
  <div class="loading"></div>
</template>

<script setup lang="ts"></script>

<style scoped>
.loading {
  height: 50px;
  width: 50px;
  border: 6px solid var(--p-color-primary-500);
  border-radius: 4px;
  box-shadow:
    0 0 8px var(--p-color-primary-500),
    0 0 8px var(--p-color-primary-500) inset;
  position: absolute;
  top: 50%;
  left: 50%;
  translate: -50% -50%;
  z-index: 10;
  animation: 2s loading ease-in-out infinite;
}

@keyframes loading {
  0% {
    transform: rotateX(0) rotateY(0) rotateZ(0);
  }
  33% {
    transform: rotateX(180deg) rotateY(0) rotateZ(0);
  }
  66% {
    transform: rotateX(180deg) rotateY(180deg) rotateZ(0);
  }
  100% {
    transform: rotateX(180deg) rotateY(180deg)
      rotateZ(180deg);
  }
}
</style>

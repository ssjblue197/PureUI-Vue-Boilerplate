<template>
  <div class="wrapper flex items-center">
    <div class="relative h-full flex-1">
      <LoginForm />
      <!-- <Spinner /> -->
    </div>
    <div
      class="relative hidden h-full flex-1 bg-[url('@/assets/images/login-bg.jpg')] bg-cover bg-center bg-no-repeat md:block"
    ></div>
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/modules/auth/components/LoginForm.vue';
import Spinner from '@/components/common/Spinner.vue';
</script>

<style scoped></style>

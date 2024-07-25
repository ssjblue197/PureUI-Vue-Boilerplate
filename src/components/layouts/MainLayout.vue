<template>
  <div class="wrapper">
    <!-- <Header class="h-[68px]" /> -->
    <div
      class="relative flex h-screen w-full flex-nowrap overflow-y-auto"
    >
      <Sidebar />
      <router-view v-slot="{ Component }">
        <component :is="Component" class="!h-full" />
      </router-view>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import Header from '@/components/common/Header.vue';
import Sidebar from '@/components/sidebar/Index.vue';

onMounted(async () => {});
</script>

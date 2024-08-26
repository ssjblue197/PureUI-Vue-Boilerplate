<template>
  <div class="wrapper">
    <div class="relative flex h-screen w-full flex-nowrap">
      <Sidebar />
      <div
        class="relative mt-3 h-[calc(100vh-12px)] flex-1 overflow-y-auto rounded-tl-[40px] border-l border-t border-gray-200"
      >
        <router-view v-slot="{ Component }">
          <component :is="Component" class="!h-full" />
        </router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';
import Sidebar from '@/components/sidebar/Index.vue';

onMounted(async () => {});
</script>

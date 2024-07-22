<template>
  <div class="wrapper text-black" id="main">
    <DefaultLayout v-if="layoutName === 'default'" />
    <MainLayout v-if="layoutName === 'main'" />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from '@/components/layouts/MainLayout.vue';
import DefaultLayout from '@/components/layouts/DefaultLayout.vue';
import { useSystemStore } from '@/stores/system';

const route = useRoute();

const layoutName = computed(() => {
  return route?.meta?.layout;
});

const readManifest = async () => {
  const systemStore = useSystemStore();
  try {
    const res = await fetch('/site.webmanifest');
    const data = await res.json();
    if (data.version !== systemStore.version) {
      systemStore.isCheckNewVersion = true;
    }
    systemStore.version = data.version;
  } catch (error) {}
};

onMounted(() => {
  // socket.asyncConnect();
  readManifest();
  document.addEventListener(
    'visibilitychange',
    function () {
      if (document.visibilityState === 'visible') {
        console.log('OPEN APP');
      }
      if (document.visibilityState === 'hidden') {
        console.log('CLOSE APP');
      }
    },
  );
});
</script>

<style scoped></style>

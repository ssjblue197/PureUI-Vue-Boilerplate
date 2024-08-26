<template>
  <div
    id="sidebar"
    class=""
    :class="
      twMerge(
        'relative flex w-[312px] select-none flex-col justify-between p-xl transition-all duration-150',
        !systemStore.isCollapseSidebar
          ? 'w-[312px]'
          : 'w-[80px]',
      )
    "
  >
    <div class="navigation flex flex-col gap-6 pt-md">
      <div class="flex w-full items-center gap-2 px-sm">
        <img src="/logo.png" alt="logo" class="h-10" />
        <span
          class="text-lg font-bold text-gray-900"
          v-if="!systemStore.isCollapseSidebar"
        >
          SwiftPOD
        </span>
      </div>

      <div class="menu flex flex-col gap-xs">
        <template v-for="i in sidebar" :key="i.id">
          <SidebarItem :data="i" />
        </template>
      </div>
    </div>
    <div
      id="footer"
      class="relative flex h-min items-center gap-lg overflow-hidden border-t border-gray-200 px-sm py-lg pt-2xl"
    >
      <div class="flex flex-1 items-center gap-lg">
        <p-dropdown
          v-if="systemStore.isCollapseSidebar"
          hoist
        >
          <span slot="trigger" class="cursor-pointer">
            <p-tooltip
              :content="authStore?.user?.name"
              hoist
            >
              <p-avatar
                label="User avatar"
                style="--size: 40px"
              ></p-avatar>
            </p-tooltip>
          </span>
          <p-menu>
            <p-menu-item @click="handleLogout">
              <span
                class="flex items-center gap-xs text-error-500"
              >
                Logout
                <p-icon-button
                  name="box-arrow-right"
                  label="Logout"
                ></p-icon-button>
              </span>
            </p-menu-item>
          </p-menu>
        </p-dropdown>
        <p-avatar
          v-else
          label="User avatar"
          style="--size: 40px"
        ></p-avatar>
        <div
          class="flex flex-col items-start"
          v-if="!systemStore.isCollapseSidebar"
        >
          <span class="text-sm font-semibold text-gray-700">
            {{ authStore?.user?.name }} </span
          ><span
            class="text-sm font-normal text-gray-600"
            v-if="authStore?.user?.email"
          >
            {{ authStore?.user?.email }}
          </span>
        </div>
      </div>
      <p-icon-button
        v-if="!systemStore.isCollapseSidebar"
        @click="handleLogout"
        name="box-arrow-right"
        label="Logout"
      ></p-icon-button>
    </div>
    <p-button
      circle
      class="absolute right-0 top-12 z-10 ml-auto translate-x-[50%]"
      @click="
        systemStore.isCollapseSidebar =
          !systemStore.isCollapseSidebar
      "
    >
      <p-icon
        name="chevron-left"
        label="Show"
        :class="{
          'rotate-180': systemStore.isCollapseSidebar,
          'rotate-0': !systemStore.isCollapseSidebar,
        }"
      ></p-icon>
    </p-button>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/modules/auth/store';
import sidebar from '@/components/sidebar/const';
import SidebarItem from '@/components/sidebar/SidebarItem.vue';
import { useRouter } from 'vue-router';
import { twMerge } from 'tailwind-merge';
import { useSystemStore } from '@/stores/system';

const systemStore = useSystemStore();
const router = useRouter();

const authStore = useAuthStore();

const handleLogout = () => {
  try {
    authStore.logout();
    router.push({ name: 'login' });
  } catch (error) {}
};
</script>

<style scoped lang="scss">
#sidebar {
  @apply h-screen min-w-[90px] bg-white;
}

#footer {
  @apply relative w-full;
}
</style>

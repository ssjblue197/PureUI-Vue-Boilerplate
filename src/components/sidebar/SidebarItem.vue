<template>
  <div
    @click.stop="
      () => {
        if (Array.isArray(props.data?.children)) {
          if (systemStore.isCollapseSidebar) {
            return;
          }
          props.data.isOpen = !props.data.isOpen;
        } else {
          routeTo(String(props.data?.router?.name));
        }
      }
    "
    :class="
      twMerge(
        'menu-item relative flex cursor-pointer select-none flex-col gap-xs overflow-hidden rounded-sm transition-all duration-200',
        props.data?.isOpen ? 'max-h-[100vh]' : 'max-h-12',
      )
    "
  >
    <div
      :class="
        twMerge(
          'flex w-full items-center gap-md py-md hover:bg-gray-50',
          props.data?.router?.name === route.name
            ? 'bg-gray-50'
            : '',
          !systemStore.isCollapseSidebar
            ? 'px-lg'
            : 'justify-center',
        )
      "
    >
      <p-dropdown
        v-if="systemStore.isCollapseSidebar"
        hoist
      >
        <span slot="trigger">
          <p-tooltip :content="props.data?.name" hoist>
            <p-icon-button
              :name="props.data?.icon"
              :label="props.data?.name"
              library="extend"
            ></p-icon-button>
          </p-tooltip>
        </span>
        <p-menu
          v-if="
            Array.isArray(props.data?.children) &&
            props.data?.children.length > 0
          "
        >
          <p-menu-item
            v-for="i in props.data?.children"
            :key="i.id"
            @click="routeTo(String(i?.router?.name))"
            >{{ i?.name }}</p-menu-item
          >
        </p-menu>
      </p-dropdown>
      <p-icon-button
        v-else
        :name="props.data?.icon"
        :label="props.data?.name"
        library="extend"
      ></p-icon-button>
      <span
        class="text-base font-semibold text-gray-700"
        v-if="!systemStore.isCollapseSidebar"
      >
        {{ props.data?.name }}
      </span>
      <p-icon-button
        v-if="
          Array.isArray(props.data?.children) &&
          props.data?.children.length > 0 &&
          !systemStore.isCollapseSidebar
        "
        name="chevron-down"
        library="extend"
        :class="
          twMerge(
            'ml-auto transition-all duration-150',
            props.data?.isOpen ? 'rotate-180' : 'rotate-0',
          )
        "
      ></p-icon-button>
    </div>

    <div
      class="flex w-full flex-col gap-xs"
      v-if="
        Array.isArray(props.data?.children) &&
        props.data?.children.length > 0
      "
    >
      <SidebarItem
        v-for="i in props.data?.children"
        :key="i.id"
        :data="i"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { SidebarRouter } from '@/components/sidebar/const';
import { useRouter, useRoute } from 'vue-router';
import { twMerge } from 'tailwind-merge';
import { useSystemStore } from '@/stores/system';

const systemStore = useSystemStore();
const route = useRoute();
const router = useRouter();

interface Props {
  data?: SidebarRouter;
}

const emit = defineEmits(['end']);
const props = withDefaults(defineProps<Props>(), {
  data: undefined,
});

const routeTo = (name: string) => {
  return router.push(name);
};
</script>

<style scoped></style>

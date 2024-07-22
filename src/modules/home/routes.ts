import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/',
    name: 'home',
    component: async () =>
      import('@/modules/home/pages/Index.vue'),
    meta: {
      layout: 'default',
    },
  },
] as Array<RouteRecordRaw>;

import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/',
    name: 'home',
    component: async () =>
      import('@/modules/home/pages/Index.vue'),
    meta: {
      layout: 'main',
    },
  },
] as Array<RouteRecordRaw>;

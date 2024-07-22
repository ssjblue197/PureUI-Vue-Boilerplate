import type { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: '/login',
    name: 'login',
    component: async () =>
      import('@/modules/auth/pages/Login.vue'),
    meta: {
      layout: 'default',
    },
  },
  {
    path: '/register',
    name: 'register',
    component: async () =>
      import('@/modules/auth/pages/Register.vue'),
    meta: {
      layout: 'default',
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: async () =>
      import('@/modules/auth/pages/ForgotPassword.vue'),
    meta: {
      layout: 'default',
    },
  },
] as RouteRecordRaw[];

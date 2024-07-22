// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { flatten } from 'ramda';
import {
  createRouter,
  createWebHistory,
  type RouteRecordRaw,
} from 'vue-router';

import http from '@/api/http';
import { acceptRouteNames } from '@/utils/sidebar';
import { useAuthStore } from '@/modules/auth/store';
import NotFound from '@/components/common/NotFound.vue';

const routes = import.meta.glob('@/modules/**/routes.ts', {
  eager: true,
});

const convertRoutes = flatten(
  Object.keys(routes).map((item) => routes[item].default),
).map((route) => {
  const routeMeta = route.meta || {};
  const layout = routeMeta.layout || '';
  if (!layout) {
    routeMeta.layout = 'default';
  }
  return {
    ...route,
    meta: routeMeta,
  } as RouteRecordRaw;
});

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...convertRoutes,
    {
      path: '/:path(.*)', // This catches all undefined routes
      name: 'NotFound',
      component: NotFound,
    },
  ],
  scrollBehavior() {
    const element = document.getElementById('main');
    if (element?.scrollTop > 0) {
      element.scrollTop = 0;
    }
    return;
  },
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.name !== 'login') {
    if (!authStore.employee) {
      next({
        name: 'login',
      });
    }
  } else {
    if (authStore.employee && authStore.employee?.id) {
      next({
        name: 'home',
      });
    }
  }
  next();
});

export default router;

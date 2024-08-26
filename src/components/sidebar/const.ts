import { reactive } from 'vue';

export interface Router {
  name: string;
  query?: { [key: string]: string };
  params?: { [key: string]: string };
  path?: string;
}

export interface SidebarRouter {
  id?: string;
  name: string;
  icon?: string;
  permissions: string[];
  router?: Router;
  children?: SidebarRouter[];
  isOpen?: boolean;
}

const sidebar: SidebarRouter[] = reactive([
  {
    id: 'insight',
    name: 'Insight',
    icon: 'home-line',
    permissions: [],
    router: {
      name: 'home',
    },
    children: [
      {
        id: 'fulfillment-report',
        name: 'Fulfillment report',
        permissions: [],
        router: {
          name: 'fulfillment-report',
        },
      },
      {
        id: 'insight',
        name: 'Insight',
        permissions: [],
        router: {
          name: 'dashboard',
        },
      },
    ],
  },

  {
    id: 'orders',
    name: 'Orders',
    icon: 'presentation-chart-01',
    permissions: [],
    router: {
      name: 'orders',
    },
  },
  {
    id: 'catalog',
    name: 'Catalog',
    icon: 'layers-three-01',
    permissions: [],
    router: {
      name: 'catalog',
    },
  },

  {
    id: 'claim',
    name: 'Claim',
    icon: 'check-done-01',
    permissions: [],
    router: {
      name: 'claim',
    },
  },

  {
    id: 'api',
    name: 'API',
    icon: 'dataflow-04',
    permissions: [],
    router: {
      name: 'api',
    },
  },
  {
    id: 'payment',
    name: 'Payment',
    icon: 'credit-card-02',
    permissions: [],
    router: {
      name: 'payment',
    },
  },
]);

export default sidebar;

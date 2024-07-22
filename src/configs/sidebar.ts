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

const sidebar: SidebarRouter[] = [
  {
    id: 'dashboard',
    name: 'sidebar.dashboard',
    icon: 'dashboard',
    permissions: [],
    router: {
      name: 'dashboard',
      path: '/',
    },
  },

  {
    id: 'affiliate',
    name: 'sidebar.affiliate',
    icon: 'contest',
    permissions: [],
    router: {
      name: 'affiliate',
      path: '/affiliate',
    },
  },
  {
    id: 'links',
    name: 'sidebar.link',
    icon: 'link',
    permissions: [],
    router: {
      name: 'links',
      path: '/links',
    },
  },

  {
    id: 'top-agent',
    name: 'sidebar.agent',
    icon: 'grow',
    permissions: [],
    router: {
      name: 'top-agent',
      path: '/top-agent',
    },
  },

  {
    id: 'report',
    name: 'sidebar.report',
    icon: 'box',
    permissions: [],
    router: {
      name: 'report',
      path: '/report',
    },
  },
  {
    id: 'withdrawal',
    name: 'sidebar.withdrawal',
    icon: 'money',
    permissions: [],
    router: {
      name: 'withdrawal',
      path: '/withdrawal',
    },
  },
  {
    id: 'Account',
    name: 'sidebar.account',
    icon: 'user',
    permissions: [],
    router: {
      name: 'account',
      path: '/account',
    },
  },
  {
    id: 'ticket',
    name: 'sidebar.ticket',
    icon: 'bot',
    permissions: [],
    router: {
      name: 'ticket',
      path: '/ticket',
    },
  },
  {
    id: 'agreement',
    name: 'sidebar.affiliate_agreement',
    icon: 'agreement',
    permissions: [],
    router: {
      name: 'agreement',
      path: '/agreement',
    },
  },
  {
    id: 'telegram',
    name: 'sidebar.telegram',
    icon: 'telegram',
    permissions: [],
    router: {
      name: 'telegram',
      path: '/telegram',
    },
  },
];

export default sidebar;

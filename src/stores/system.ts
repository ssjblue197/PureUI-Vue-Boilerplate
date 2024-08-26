import { defineStore } from 'pinia';

interface System {
  isCheckNewVersion: boolean;
  version: string;
  sessionTimeout: Number | null;
  isCollapseSidebar: boolean;
}

export const useSystemStore = defineStore({
  id: 'system',
  state: (): System => ({
    isCheckNewVersion: false,
    version: 'beta',
    sessionTimeout: null,
    isCollapseSidebar: false as boolean,
  }),
  getters: {},
  actions: {},
  persist: {
    storage: localStorage,
    key: 'system-storage-spod-app',
    // paths: ['filter', 'total', 'selectRequest'] /*Define states can persisted*/
  },
});

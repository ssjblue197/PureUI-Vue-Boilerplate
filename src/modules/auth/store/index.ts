import { defineStore } from 'pinia';
import AuthAPI from '@/services/api/auth';
import type { AuthParams } from '@/api/auth';
import { useNotificationStore } from '@/stores/notification';
import axios from 'axios';
import { getErrorMessage } from '@/utils/helper';
import type { Employee } from '@/modules/auth/types';

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      employee: null as Employee | null,
      token: null as string | null,
      warehouse: null as any,
    };
  },
  actions: {
    async login(payload: AuthParams) {
      const notificationStore = useNotificationStore();
      try {
        const { data } = await AuthAPI.login(payload);
        this.employee = data?.employee || null;
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notificationStore.showMessage({
            title: 'Scanning Error!',
            message: getErrorMessage(error),
          });
        }
      }
    },
  },
  persist: {
    storage: localStorage,
    key: 'seller-app-auth-storage',
    // paths: [] /*Define states can persisted*/
  },
});

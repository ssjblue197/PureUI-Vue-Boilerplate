import { defineStore } from 'pinia';
import AuthAPI from '@/services/api/auth';
import axios from 'axios';
import { getErrorMessage } from '@/utils/helper';
import type { User, Form } from '@/modules/auth/types';
import { useToast } from '@/composables/useToast';

const toast = useToast();

export const useAuthStore = defineStore('auth', {
  state: () => {
    return {
      user: null as User | null,
      token: null as string | null,
      warehouse: null as any,
    };
  },
  actions: {
    async login(payload: Form) {
      try {
        const { data } = await AuthAPI.login(payload);
        this.token = data?.access_token || null;
        this.user = data?.user || null;
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.show({
            variant: 'danger',
            message: getErrorMessage(error),
          });
        }
      }
    },
    async logout() {
      try {
        //handle logout
        this.user = null;
        this.token = null;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.show({
            variant: 'danger',
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

import { defineStore } from 'pinia';
import { login, checkToken } from '@/api/auth';
import type { AuthParams } from '@/api/auth';
import { useNotificationStore } from '@/stores/notification';
import axios from 'axios';
import { getErrorMessage } from '@/utils/helper';

export const useHomeStore = defineStore('home', {
  state: () => {
    return {
      employee: null as Employee | null,
      time_checking_id: null as number | null,
      token: null as string | null,
      warehouse: null as any,
    };
  },
  actions: {
    async login(payload: AuthParams) {
      const notificationStore = useNotificationStore();
      try {
        const { data } = await login(payload);
        this.employee = data?.employee || null;
        this.time_checking_id =
          data?.time_tracking_id || null;
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
    async checkToken() {
      const notificationStore = useNotificationStore();
      try {
        const { data } = await checkToken();
        const warehouseList = data?.user?.warehouses;
        const access_token = data?.access_token;
        if (access_token) {
          const primaryInfo = JSON.parse(
            atob(access_token.split('.')?.[1]),
          );
          const warehouseID = primaryInfo?.warehouse?.id;
          if (warehouseList?.length > 0) {
            this.warehouse = warehouseList?.find(
              (item: any) =>
                Number(item?.id) === Number(warehouseID),
            );
          }
        }
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          notificationStore.showMessage({
            title: 'Scanning Error!',
            message: 'Invalid QR code. Please try again!',
          });
        }
      }
    },
  },
  persist: {
    storage: localStorage,
    key: 'home-storage-pod-app',
    // paths: [] /*Define states can persisted*/
  },
});

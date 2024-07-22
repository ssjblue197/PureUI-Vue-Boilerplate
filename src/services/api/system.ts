import axiosClient from '@/services/api';
import type { Notification } from '@/components/common/Notification';

export default {
  async countryList() {
    const response = await axiosClient.get(`/country`);
    return response;
  },
  async upload(payload: FormData) {
    const response = await axiosClient.post(
      `/uploads`,
      payload,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response;
  },
  async chainList() {
    const response = await axiosClient.get(`/chain-list`);
    return response;
  },
  async notification() {
    const response =
      await axiosClient.get(`/notifications`);
    return response;
  },
  async readNotification(payload: Partial<Notification>) {
    const response = await axiosClient.post(
      `/notifications`,
      {
        id: payload?.id,
      },
    );
    return response;
  },
  async loadTranslation() {
    const response =
      await axiosClient.get(`/agent/language`);
    return response;
  },
};

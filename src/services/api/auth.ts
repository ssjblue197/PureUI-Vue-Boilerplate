import axiosClient from '@/services/api';
import type { Form } from '@/modules/auth/types';
export default {
  async login(payload: Form) {
    const response = await axiosClient.post(
      `/login`,
      payload,
    );
    return response;
  },
  async refresh() {
    const response = await axiosClient.get(`/refresh`);
    return response;
  },
  async register(payload: Form) {
    const response = await axiosClient.post(
      `/register`,
      payload,
    );
    return response;
  },
  async forgotPassword(payload: Form) {
    const response = await axiosClient.post(
      `/forgot-password`,
      payload,
    );
    return response;
  },
};

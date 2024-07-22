import axiosClient from '@/services/api';
import type { Form } from '@/features/auth/types';
export default {
  async login(payload: Form) {
    const response = await axiosClient.post(
      `/agent/login`,
      payload,
    );
    return response;
  },
  async refresh() {
    const response =
      await axiosClient.get(`/agent/refresh`);
    return response;
  },
  async logout() {
    const response = await axiosClient.get(`/agent/logout`);
    return response;
  },
  async register(payload: Form) {
    const response = await axiosClient.post(
      `/agent/register`,
      payload,
    );
    return response;
  },
  async forgotPassword(payload: Form) {
    const response = await axiosClient.post(
      `/agent/forgot-password`,
      payload,
    );
    return response;
  },
};

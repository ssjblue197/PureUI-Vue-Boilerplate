<template>
  <div
    class="wrapper flex flex-col items-center justify-center"
  >
    <div class="flex flex-col items-center gap-8">
      <div
        id="header"
        class="flex flex-col items-center gap-6"
      >
        <img src="/logo.png" alt="logo" class="h-12" />
        <div class="flex flex-col items-center gap-3">
          <span
            class="text-title-sm font-semibold text-gray-900"
          >
            Welcome back
          </span>
          <span class="text-base font-normal text-gray-600">
            Welcome back! Please enter your details.
          </span>
        </div>
      </div>
      <div
        id="content"
        class="relative flex w-[360px] flex-col items-center gap-6"
      >
        <Form
          class="flex w-full flex-col items-start gap-5"
          :form="form"
          @submit="handleSubmit"
          id="login-form"
        >
          <FormField
            :form="form"
            element="input"
            :label="'Username'"
            placeholder="Enter username"
            name="username"
            class="w-full"
          />
          <FormField
            :form="form"
            element="input"
            :label="'Password'"
            placeholder="Enter your password"
            name="password"
            type="password"
            autocomplete="current-password"
            password-toggle
            class="w-full"
          />
          <!-- <FormField
            :form="form"
            element="file-upload"
            :label="'Your CV'"
            name="file"
            class="w-full"
          /> -->
        </Form>
        <!-- <div
          class="flex w-full items-center justify-between"
        >
          <p-checkbox>Remember me</p-checkbox>
          <span
            class="inline-block cursor-pointer select-none text-sm font-semibold text-brand-700 active:opacity-80"
          >
            Forgot password
          </span>
        </div> -->
      </div>
      <!-- <div id="footer" class="text-center">
        <span class="text-sm font-normal text-gray-600">
          Don’t have an account?
          <span
            class="inline-block cursor-pointer select-none text-sm font-semibold text-brand-700 active:opacity-80"
          >
            Sign up
          </span>
        </span>
      </div> -->
      <div class="flex w-full flex-col gap-4">
        <p-button
          variant="primary"
          type="submit"
          @click="submitForm"
          >Sign in</p-button
        >
        <!-- <p-button variant="primary" outline
          >Sign in with Google</p-button
        > -->
      </div>
    </div>
    <a
      class="absolute bottom-6 text-xs text-gray-400 md:left-6"
      href="https://pureui.xyz/"
      target="_blank"
      >© Power by Pure UI.</a
    >
  </div>
</template>

<script setup lang="ts">
import { $ } from '@/utils/helper';
import { useForm } from '@/components/form-control';
import { useAuthStore } from '@/modules/auth/store';
import type { Form } from '@/modules/auth/types';
import { loginSchema } from '@/modules/auth/types';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const form = useForm({
  schema: loginSchema,
  initialValues: {
    username: '',
    password: '',
  },
  mode: 'onChange',
  criteriaMode: 'firstError',
  shouldFocusError: true,
});

const handleSubmit = async (data: Form) => {
  try {
    await authStore.login(data);
    router.push({ name: 'home' });
  } catch (error) {}
};

const submitForm = () => {
  try {
    const form = $('#login-form') as HTMLFormElement;
    form?.requestSubmit();
  } catch (error) {
    console.log('error', error);
  }
};
</script>

<style scoped></style>

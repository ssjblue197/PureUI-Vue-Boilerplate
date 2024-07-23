<template>
  <div
    class="wrapper flex flex-col items-center justify-center bg-[url('@/assets/images/background-pattern.jpg')] bg-contain bg-top bg-no-repeat"
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
            :label="'Email'"
            placeholder="Enter your email"
            name="email"
            class="w-full"
            type="email"
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
        </Form>
        <div
          class="flex w-full items-center justify-between"
        >
          <sl-checkbox>Remember me</sl-checkbox>
          <span
            class="inline-block cursor-pointer select-none text-sm font-semibold text-brand-700 active:opacity-80"
          >
            Forgot password
          </span>
        </div>
      </div>
      <div id="footer" class="text-center">
        <span class="text-sm font-normal text-gray-600">
          Don’t have an account?
          <span
            class="inline-block cursor-pointer select-none text-sm font-semibold text-brand-700 active:opacity-80"
          >
            Sign up
          </span>
        </span>
      </div>
      <div class="flex w-full flex-col gap-4">
        <sl-button
          variant="primary"
          type="submit"
          @click="submitForm"
          >Sign in</sl-button
        >
        <sl-button variant="primary" outline
          >Sign in with Google</sl-button
        >
      </div>
    </div>
    <span
      class="absolute bottom-6 text-sm text-gray-600 md:left-6"
      >© Copyright 2024.</span
    >
  </div>
</template>

<script setup lang="ts">
import { z } from 'zod';
import { $ } from '@/utils/helper';
import { useForm } from '@/components/form-control';
import makeid from '@/utils/makeid';
import { useAuthStore } from '@/modules/auth/store';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();

const router = useRouter();

// Define your form schema using Zod
const schema = z.object({
  email: z
    .string()
    .email({ message: 'Invalid email address' })
    .nullable(),
  password: z.string().min(6).nullable(),
});

const form = useForm({
  schema,
  initialValues: {
    email: '',
    password: '',
  },
  mode: 'onChange',
  criteriaMode: 'firstError',
  shouldFocusError: true,
});

const handleSubmit = (data: any) => {
  console.log(data);
  authStore.token = makeid(32);
  router.push({ name: 'home' });
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

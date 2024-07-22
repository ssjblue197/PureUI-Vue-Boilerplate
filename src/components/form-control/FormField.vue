<template>
  <div
    class="relative flex w-full flex-col items-start justify-start gap-1.5"
  >
    <span
      v-if="props.label && props.element !== 'checkbox'"
      class="text-sm font-medium text-gray-700"
    >
      {{ props.label }}
    </span>
    <component
      :is="currentComponent"
      v-bind="$attrs"
      ref="element"
    >
      <span v-if="props.element === 'checkbox'">{{
        props.label
      }}</span>
    </component>
    <span
      v-if="errorMessage"
      class="text-sm font-normal text-error-500"
    >
      {{ errorMessage }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { inject, computed } from 'vue';
import * as z from 'zod';

const errors = inject('errors') as Array<z.ZodIssue>;

const errorMessage = computed(() => {
  const currentInstance = getCurrentInstance();
  const fieldName = currentInstance?.attrs?.name;

  if (Array.isArray(errors) && fieldName) {
    const error = errors.find(
      (err) => err.path[0] === fieldName,
    );
    if (error) {
      return error.message;
    }
  }
  return;
});
interface Props {
  label?: string;
  error?: string;
  element?:
    | 'input'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'textarea';
}

const props = withDefaults(defineProps<Props>(), {
  label: undefined,
  error: undefined,
  element: 'input',
});

const currentComponent = computed(() => {
  switch (props.element) {
    case 'input':
      return 'sl-input';
    case 'select':
      return 'sl-select';
    case 'checkbox':
      return 'sl-checkbox';
    case 'radio':
      return 'sl-radio';
    case 'textarea':
      return 'sl-textarea';
    default:
      break;
  }
});
</script>

<style scoped></style>

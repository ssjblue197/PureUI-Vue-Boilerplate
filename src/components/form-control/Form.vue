<template>
  <form
    novalidate
    v-bind="$attrs"
    @submit="submit"
    :name="props.name"
  >
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
import { serialize } from '@shoelace-style/shoelace/dist/utilities/form.js';
import * as z from 'zod';
import { provide, ref } from 'vue';

interface Props {
  schema?: any;
  name: string;
}

const props = withDefaults(defineProps<Props>(), {
  schema: undefined,
  name: 'form',
});

const emits = defineEmits(['submit']);

const errors = ref<Array<z.ZodIssue>>([]);

provide(`errors`, errors.value);

const submit = (event: Event) => {
  try {
    event.preventDefault();
    const data = serialize(event.target as HTMLFormElement);
    if (props.schema) {
      // const parsed = props.schema.parse(data);
      emits('submit', data);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      const err = error as z.ZodError;
      if (Array.isArray(err?.issues)) {
        errors.value = structuredClone(err.issues);
      }
    }
  }
};
</script>

<style scoped></style>

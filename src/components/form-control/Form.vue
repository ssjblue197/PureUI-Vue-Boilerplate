<template>
  <form novalidate v-bind="$attrs" @submit="handleSubmit">
    <slot></slot>
  </form>
</template>

<script setup lang="ts">
interface Props {
  form?: any;
}

const props = withDefaults(defineProps<Props>(), {
  form: undefined,
});

const emits = defineEmits(['submit']);

function submit(data: any) {
  emits('submit', data);
}

const handleSubmit = (event: Event) => {
  try {
    event.preventDefault();
    props.form.handleSubmit(submit);
  } catch (error) {
    console.log('error', error);
  }
};
</script>

<style scoped></style>

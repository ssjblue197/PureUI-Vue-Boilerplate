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
      @p-change="props.form.handleChange"
      @p-blur="props.form.handleBlur"
      @p-input="props.form.handleTouch"
    >
      <span v-if="props.element === 'checkbox'">{{
        props.label
      }}</span>
    </component>
    <transition name="slide-fade-up" appear>
      <span
        v-if="local.error"
        class="text-sm font-normal text-error-500"
      >
        {{ local.error }}
      </span>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  computed,
  reactive,
  getCurrentInstance,
  ref,
  watch,
  onMounted,
} from 'vue';

interface Props {
  form: any;
  label?: string;
  element?:
    | 'input'
    | 'select'
    | 'checkbox'
    | 'radio'
    | 'textarea'
    | 'switch'
    | 'color-picker'
    | 'file-upload';
}

const props = withDefaults(defineProps<Props>(), {
  form: undefined,
  label: undefined,
  element: 'input',
});

const currentComponent = computed(() => {
  switch (props.element) {
    case 'input':
      return 'p-input';
    case 'select':
      return 'p-select';
    case 'checkbox':
      return 'p-checkbox';
    case 'radio':
      return 'p-radio';
    case 'textarea':
      return 'p-textarea';
    case 'switch':
      return 'p-switch';
    case 'color-picker':
      return 'p-color-picker';
    case 'file-upload':
      return 'p-file-upload';
    default:
      break;
  }
});

const currentInstance = ref<any>(null);

interface Local {
  error?: string;
}

const local: Local = reactive({
  error: '',
});

watch(
  () => props.form.errors,
  () => {
    const fieldName = currentInstance.value?.attrs
      ?.name as string;
    local.error =
      fieldName && props.form.errors.value[fieldName];
  },
  {
    deep: true,
  },
);

onMounted(() => {
  currentInstance.value = getCurrentInstance();
});
</script>

<style scoped></style>

import {
  type App,
  type Plugin,
  DirectiveBinding,
} from 'vue';

export default {
  install: (app: App) => {
    const wm = new WeakMap();

    app.directive('pure', {
      beforeMount(el, binding: DirectiveBinding, _vnode) {
        // Determine the event name based on the web component
        const eventName = ['P-SELECT', 'P-TABLE'].includes(
          el.tagName,
        )
          ? 'p-change'
          : 'p-input';

        // Event handler to update the Vue model when the component emits an event
        function inputHandler(event: Event) {
          const newValue = (
            event.target as HTMLInputElement
          ).value;

          if (
            binding.value &&
            typeof binding.value === 'object' &&
            'value' in binding.value
          ) {
            // If `binding.value` is a `ref`, update `ref.value`
            binding.value.value = newValue;
          } else {
            // If it's a normal reactive object or prop, update it directly
            binding.value = newValue;
          }
          el?.requestUpdate();
        }

        // Store the handler in WeakMap for later removal
        wm.set(el, inputHandler);

        // Set the initial value from the binding (similar to v-model)
        el.value = binding.value ?? '';

        // Add the event listener for custom events
        el.addEventListener(eventName, inputHandler);
      },

      updated(el, binding) {
        // Update the element's value when the Vue model changes
        el.value =
          binding.value?.value ?? binding.value ?? '';
      },

      unmounted(el) {
        // Remove the event listener when the directive is unmounted
        const inputHandler = wm.get(el);
        if (inputHandler) {
          const eventName = [
            'P-SELECT',
            'P-TABLE',
          ].includes(el.tagName)
            ? 'p-change'
            : 'p-input';
          el.removeEventListener(eventName, inputHandler);
        }
      },
    });
  },
} as Plugin;

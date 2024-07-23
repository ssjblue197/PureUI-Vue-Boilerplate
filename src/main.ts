import { createApp } from 'vue';
import '@shoelace-style/shoelace/dist/themes/light.css';
import '@shoelace-style/shoelace/dist/themes/dark.css';
import '@/assets/styles/index.scss';
import App from './App.vue';
import { setBasePath } from '@shoelace-style/shoelace/dist/utilities/base-path.js';
import { registerIconLibrary } from '@shoelace-style/shoelace/dist/utilities/icon-library.js';
import '@shoelace-style/shoelace/dist/shoelace.js';
import Form from '@/components/form-control/Form.vue';
import FormField from '@/components/form-control/FormField.vue';

import stores from '@/stores';
import router from '@/router';

import dayjs from '@/plugins/dayjs';

setBasePath('/public');
registerIconLibrary('extend', {
  resolver: (name: string) => `icons/${name}.svg`, //Public folder after bundle
  mutator: (svg: SVGElement) =>
    svg.setAttribute('fill', 'currentColor'),
});

const app = createApp(App);

// Use the Day.js plugin
app.use(dayjs);

app.component('Form', Form);
app.component('FormField', FormField);

app.use(router);
app.use(stores);

app.mount('#app');

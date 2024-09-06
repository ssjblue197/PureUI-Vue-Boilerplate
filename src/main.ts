import { createApp } from 'vue';
import 'pure-uikit/dist/themes/light.css';
import 'pure-uikit/dist/themes/dark.css';
import '@/assets/styles/index.scss';
import App from './App.vue';
import { setBasePath } from 'pure-uikit/dist/utilities/base-path.js';
import { registerIconLibrary } from 'pure-uikit/dist/utilities/icon-library.js';
import 'pure-uikit/dist/pure-ui.js';
import Form from '@/components/form-control/Form.vue';
import FormField from '@/components/form-control/FormField.vue';

import stores from '@/stores';
import router from '@/router';

import dayjs from '@/plugins/dayjs';

import PureModel from '@/plugins/pure-model';

setBasePath('/public');
registerIconLibrary('extend', {
  resolver: (name: string) => `icons/${name}.svg`, //Public folder after bundle
  mutator: (svg: SVGElement) => {
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
  },
});

const app = createApp(App);

app.use(PureModel);

// Use the Day.js plugin
app.use(dayjs);

app.component('Form', Form);
app.component('FormField', FormField);

app.use(router);
app.use(stores);

app.mount('#app');

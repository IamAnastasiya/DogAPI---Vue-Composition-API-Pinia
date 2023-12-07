import { createApp, defineAsyncComponent } from 'vue';
import { createPinia } from 'pinia';
import router from './router.ts';
import './styles/style.scss';
import App from './App.vue';

const BackButton = defineAsyncComponent(() => import('../src/components/buttons/BackButton.vue'));
const GridLayout = defineAsyncComponent(() => import('../src/components/layout/GridLayout.vue'));
const SelectList = defineAsyncComponent(() => import('../src/components/select/SelectList.vue'));
const LoaderSpinner = defineAsyncComponent(() => import('../src/components/loader/LoaderSpinner.vue'));

const pinia = createPinia();

createApp(App)
.use(router)
.use(pinia)
.component('back-button', BackButton)
.component('grid-layout', GridLayout)
.component('select-list', SelectList)
.component('loader-spinner', LoaderSpinner)
.mount('#app');

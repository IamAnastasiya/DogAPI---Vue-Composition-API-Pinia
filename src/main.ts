import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router.ts';
import './styles/style.scss';
import App from './App.vue';

const pinia = createPinia();

createApp(App)
.use(router)
.use(pinia)
.mount('#app');

import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';

import App from './app.vue';
import { router } from './router';
import { store } from './store';

document.body.classList.add(
    'app',
    'sidebar-fixed',
    'footer-fixed',
);

Vue.use(BootstrapVue);

new Vue({
    components: { App },
    router,
    store,
    template: '<App />',
})
.$mount('#app');

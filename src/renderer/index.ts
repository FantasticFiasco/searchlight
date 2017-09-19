import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';

import App from './app.vue';
import { router } from './router';
import { store } from './store';

Vue.use(BootstrapVue);

// tslint:disable:no-unused-expression
new Vue({
    el: '#app',
    store,
    router,
    render: (h) => h(App),
});

document.body.classList.add(
    'app',
    'header-fixed',
    'sidebar-fixed',
    'footer-fixed',
);

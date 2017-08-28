import BootstrapVue from 'bootstrap-vue';
import Vue from 'vue';
import App from './app.vue';
import Router from './router';

Vue.use(BootstrapVue);

// tslint:disable:no-unused-expression
new Vue({
    el: '#app',
    router: Router,
    render: (h) => h(App),
});

import Vue from 'vue';
import Router from 'vue-router';
import Devices from './../views/devices.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Devices',
            component: Devices,
        },
    ],
});

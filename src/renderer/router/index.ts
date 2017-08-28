import Vue from 'vue';
import Router from 'vue-router';
import About from './../views/about.vue';
import Devices from './../views/devices.vue';
import Settings from './../views/settings.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            name: 'devices',
            path: '/devices',
            alias: '/',
            component: Devices,
        },
        {
            name: 'settings',
            path: '/settings',
            component: Settings,
        },
        {
            name: 'about',
            path: '/about',
            component: About,
        },
    ],
});

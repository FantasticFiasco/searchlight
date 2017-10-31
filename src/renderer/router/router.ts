import Vue from 'vue';
import Router, { Route } from 'vue-router';

import AppContainer from './../containers/app-container.vue';
import About from './../views/about.vue';
import Devices from './../views/devices.vue';

Vue.use(Router);

export const router = new Router({
    mode: 'history',
    linkActiveClass: 'open active',
    scrollBehavior: (to: Route, from: Route) => ({
        x: 0,
        y: 0,
    }),
    routes: [
        {
            name: 'Home',
            path: '/',
            redirect: { name: 'Devices' },
            component: AppContainer,
            children: [
                {
                    name: 'Devices',
                    path: 'devices',
                    component: Devices,
                },
                {
                    name: 'About',
                    path: 'about',
                    component: About,
                },
            ],
        },
        {
            name: 'Fallback',
            path: '*',
            redirect: { name: 'Devices' },
        },
    ],
});

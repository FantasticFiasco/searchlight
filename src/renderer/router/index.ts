import Vue from 'vue';
import Router, { Route } from 'vue-router';
import AppContainer from './../containers/app-container.vue';
import About from './../views/about.vue';
import Devices from './../views/devices.vue';
import Settings from './../views/settings.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    linkActiveClass: 'active',
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
                    name: 'Settings',
                    path: 'settings',
                    component: Settings,
                },
                {
                    name: 'About',
                    path: 'about',
                    component: About,
                },
            ],
        },
    ],
});

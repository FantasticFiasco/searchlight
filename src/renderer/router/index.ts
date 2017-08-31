import Vue from 'vue';
import Router from 'vue-router';
import About from './../views/about.vue';
import Devices from './../views/devices.vue';
import Settings from './../views/settings.vue';
import AppContainer from './../containers/app-container.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            name: 'home',
            path: '/',
            redirect: { name: 'devices' },
            component: AppContainer,
            children: [
                {
                    name: 'devices',
                    path: 'devices',
                    component: Devices,
                },
                {
                    name: 'settings',
                    path: 'settings',
                    component: Settings,
                },
                {
                    name: 'about',
                    path: 'about',
                    component: About,
                },
            ]
        }
    ],
});

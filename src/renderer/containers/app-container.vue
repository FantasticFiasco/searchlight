<template>
    <div class="app">
        <Header/>
        <div class="app-body">
            <Sidebar :navItems="nav" />
            <main class="main">
                <Breadcrumb :list="list" />
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
            <Aside/>
        </div>
        <Footer/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { RouteRecord } from 'vue-router';
import Component from 'vue-class-component';

import Aside from '../components/aside.vue'
import Breadcrumb from '../components/breadcrumb.vue'
import Footer from '../components/footer.vue'
import Header from '../components/header.vue'
import Sidebar from '../components/sidebar.vue'
import { IView } from '../views/iview';
import { AboutView } from '../views/about-view';
import { DevicesView } from '../views/devices-view';
import { SettingsView } from '../views/settings-view';

@Component({
    name: 'app-container',
    components: {
        Aside,
        Breadcrumb,
        Footer,
        Header,
        Sidebar,
    },
})
export default class AppContainer extends Vue {
    nav: Array<IView> = [
        new DevicesView(),
        new SettingsView(),
        new AboutView(),
    ];

    get name(): string {
        if (this.$route.name !== undefined) {
            return this.$route.name;
        }

        return "unknown name";
    }

    get list(): RouteRecord[] {
        return this.$route.matched;
    }
}
</script>

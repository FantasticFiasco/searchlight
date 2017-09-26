<template>
    <div>
        <Header/>
        <div class="app-body">
            <Sidebar :navItems="views" />
            <main class="main">
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
        </div>
        <Footer/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import Footer from '../components/footer.vue'
import Header from '../components/header.vue'
import Sidebar from '../components/sidebar.vue'
import {
    AboutView,
    DevicesView,
    IView
} from '../views';

@Component({
    name: 'app-container',
    components: {
        Footer,
        Header,
        Sidebar,
    },
})
export default class AppContainer extends Vue {
    public views: Array<IView> = [
        new DevicesView(),
        new AboutView(),
    ];

    public get name(): string {
        return this.$route.name || 'unknown name';
    }
}
</script>

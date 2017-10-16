<template>
    <div>
        <div class="app-body">
            <Sidebar :navItems="views" />
            <main class="main">
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
        </div>
        <Footer />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';

import { APPLICATION_UPDATES_SERVICE, ApplicationUpdatesService } from './services';
import AppFooter from './components/footer.vue'
import Sidebar from './components/sidebar.vue'
import { AboutView, DevicesView, IView } from './views';

@Component({
    name: 'app-container',
    components: {
        AppFooter,
        Sidebar,
    },
})
export default class AppContainer extends Vue {
    @Inject(APPLICATION_UPDATES_SERVICE)
    private readonly applicationUpdatesService: ApplicationUpdatesService;

    public views: Array<IView>;

    public get name(): string {
        return this.$route.name || '';
    }

    public created() {
        this.views  = [
            new DevicesView(),
            new AboutView(this.applicationUpdatesService),
        ];
    }
}
</script>

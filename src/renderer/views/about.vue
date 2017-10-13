<template>
    <div class="animated fadeIn">
        <AppDetails />
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';

import AppDetails from '../components/app-details.vue';
import { ANALYTICS_SERVICE } from '../dependency-injection';
import { AnalyticsService, PageView } from '../services';

@Component({
    name: 'about',
    components: {
        AppDetails,
    }
})
export default class About extends Vue {
    @Inject(ANALYTICS_SERVICE)
    private readonly analyticsService: AnalyticsService;

    public mounted() {
        this.analyticsService.reportPageView(new PageView('/about'));
    }
}
</script>


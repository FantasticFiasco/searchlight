<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-sm-6 col-lg-3" v-for="device in devices" :key="device.macAddress">
                <Device :device="device" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'vuex';
import { Component, Inject } from 'vue-property-decorator';

import DeviceComponent from '../components/device.vue';
import { Device } from '../models';
import { ANALYTICS_SERVICE } from '../dependency-injection';
import { AnalyticsService, PageView } from '../services';

@Component({
    name: 'devices',
    components: {
        'Device': DeviceComponent
    },
})
export default class Devices extends Vue {
    @Inject(ANALYTICS_SERVICE)
    private readonly analyticsService: AnalyticsService;

    public get devices() {
        // Vuex prohibits modifying state outside of store modifiers, thus the 'slice'
        return this.$store.state.devices.slice().sort((a: Device, b: Device) => {
            return (a.name || '').localeCompare(b.name || '');
        });
    }

    public mounted() {
        this.analyticsService.reportPageView(new PageView('/devices'));
    }
}
</script>

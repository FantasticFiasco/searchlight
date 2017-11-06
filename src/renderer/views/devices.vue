<template>
    <div class="animated fadeIn">
        <b-alert :show="devices.length === 0" variant="warning">
            <h3>Staring up into the void...</h3>
            <h3><i class="fa fa-exclamation-circle"></i>We didn't find any devices</h3>
            <hr>
            <p>
                Is the device connected and its LED shining with a steady green light?
            </p>
            <p>
                If not please troubleshout the device using
                <a href="#" class="alert-link">instructions from Axis Communications</a>
            </p>
        </b-alert>
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
import { ANALYTICS_SERVICE, AnalyticsService, PageViewEvent } from '../services';

@Component({
    name: 'devices',
    components: {
        'Device': DeviceComponent,
    },
})
export default class Devices extends Vue {
    @Inject(ANALYTICS_SERVICE)
    private readonly analyticsService: AnalyticsService;

    public get devices(): Device[] {
        // Vuex prohibits modifying state outside of store modifiers, thus the 'slice'
        return this.$store.state.devices.slice().sort((a: Device, b: Device) => {
            return (a.name || '').localeCompare(b.name || '');
        });
    }

    public mounted() {
        this.analyticsService.reportPageView(new PageViewEvent('/devices'));
    }
}
</script>

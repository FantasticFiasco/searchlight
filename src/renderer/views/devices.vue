<template>
    <div class="animated fadeIn">
        <b-alert :show="devices.length === 0" variant="warning">
            <h3>Staring up into the void</h3>
            <hr>
            <h5>Well this was awkward, your devices are nowhere to be found...</h5>
            <br>
            <p>
                A device should be found if the following criteria are met:
            </p>
            <ul>
                <li>The device is connected</li>
                <li>Its LED is shining with a steady green light</li>
            </ul>
            <p>
                If the above is true, and you still are unable to find your device, proceed to troubleshoot the problem using <a href="#" class="alert-link">Axis Communication support</a>.
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


    https://www.axis.com/learning/web-articles/troubleshooting-axis-cameras
}
</script>

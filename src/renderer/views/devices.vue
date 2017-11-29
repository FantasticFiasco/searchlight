<template>
    <div class="animated fadeIn">
        <b-alert :show="isShowingAlert" variant="warning">
            <h3>Well this was unfortunate, your device is nowhere to be found</h3>
            <p>
                Before continuing please make sure that the following conditions are met:
            </p>
            <ul>
                <li>The device is connected to the network</li>
                <li>The LED is shining with a steady green light</li>
            </ul>
            <p>
                If the device still isn't found, head over to
                <a @click="openSupportPage" href="#" class="alert-link">Axis Communication support</a>
                and continue troubleshooting your issue.
            </p>
        </b-alert>
        <b-row>
            <b-col xs="12" sm="6" lg="4" xl="3" v-for="device in devices" :key="device.macAddress">
                <Device :device="device" />
            </b-col>
        </b-row>
    </div>
</template>

<script lang="ts">
import { shell } from 'electron';
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

    private preventAlert = true;
    private preventAlertHandle?: number;

    public get isShowingAlert(): boolean {
        return !this.preventAlert && this.devices.length === 0;
    }

    public get devices(): Device[] {
        // Vuex prohibits modifying state outside of store modifiers, thus the 'slice'
        return this.$store.state.devices.slice().sort((a: Device, b: Device) => {
            return (a.name || '').localeCompare(b.name || '');
        });
    }

    public mounted() {
        this.analyticsService.reportPageView(new PageViewEvent('/devices'));

        this.preventAlertHandle = window.setTimeout(
            () => { this.preventAlert = false; },
            5000);
    }

    public beforeDestroy() {
        if (this.preventAlertHandle) {
            clearTimeout(this.preventAlertHandle);
        }
    }

    public openSupportPage(e: Event) {
        e.preventDefault();

        shell.openExternal('https://www.axis.com/learning/web-articles/troubleshooting-axis-cameras');
    }
}
</script>

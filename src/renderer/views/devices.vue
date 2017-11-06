<template>
    <div class="animated fadeIn">
        <b-alert :show="devices.length === 0">
            <h3>Staring into the void...</h3>
            <hr>
            <h5>Well this was unfortunately, your device is nowhere to be found <i class="fa fa-frown-o"></i></h5>
            <br>
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
        <div class="row">
            <div class="col-sm-6 col-lg-3" v-for="device in devices" :key="device.macAddress">
                <Device :device="device" />
            </div>
        </div>
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

    public get devices(): Device[] {
        // Vuex prohibits modifying state outside of store modifiers, thus the 'slice'
        return this.$store.state.devices.slice().sort((a: Device, b: Device) => {
            return (a.name || '').localeCompare(b.name || '');
        });
    }

    public mounted() {
        this.analyticsService.reportPageView(new PageViewEvent('/devices'));
    }

    public openSupportPage(e: Event) {
        e.preventDefault();

        shell.openExternal('https://www.axis.com/learning/web-articles/troubleshooting-axis-cameras');
    }
}
</script>

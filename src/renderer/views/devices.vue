<template>
    <div class="animated fadeIn">
        <Device v-for="device in devices" :key="device.serialNumber" :device="device">
        </Device>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'vuex';
import Component from 'vue-class-component';
import * as Axis from 'axis-discovery';

import { DISCOVERY_SERVICE } from '../dependency-injection';
import { DiscoveryService } from '../services';
import Device from '../components/device.vue';

@Component({
    name: 'devices',
    inject: {
        'discoveryService': DISCOVERY_SERVICE,
    },
    components: {
        Device
    },
})
export default class Devices extends Vue {
    private readonly discoveryService: DiscoveryService;

    public get devices() {
        return this.$store.getters.sortedDevices;
    }

    public mounted() {
        this.discoveryService.onHello((device: Axis.Device) => this.onHello(device));
        this.discoveryService.onGoodbye((device: Axis.Device) => this.onGoodbye(device));

        // Trigger the initial search
        this.discoveryService.search();

        // Trigger a new search every 10 seconds
        setInterval(() => this.discoveryService.search(), 10000);
    }

    private onHello(device: Axis.Device) {
        this.$store.commit('addOrUpdateDevice', device);
    }

    private onGoodbye(device: Axis.Device) {
        this.$store.commit('removeDevice', device);
    }
}
</script>

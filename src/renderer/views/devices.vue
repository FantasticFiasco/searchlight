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
        // Trigger the initial search
        this.discoveryService.search();

        // Trigger a new search every 10 seconds
        setInterval(() => this.discoveryService.search(), 10000);
    }
}
</script>

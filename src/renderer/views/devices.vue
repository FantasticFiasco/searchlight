<template>
    <div class="animated fadeIn">
        <h1>Devices</h1>
        <p v-for="device in devices" :key="device.serialNumber">{{ device }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Device } from 'axis-discovery';

import { DiscoveryService } from '../services/discovery-service';

@Component({
    name: 'devices',
})
export default class Devices extends Vue {
    private readonly discoveryService: DiscoveryService;

    constructor() {
        super();
        this.discoveryService = new DiscoveryService;
    }

    public devices: Device[] = [];

    public mounted() {
        this.discoveryService.onHello((device: Device) => this.onHello(device));
        this.discoveryService.onGoodbye((device: Device) => this.onGoodbye(device));

        // Trigger the initial search
        this.discoveryService.search();

        // Trigger a new search every 10 seconds
        setInterval(() => this.discoveryService.search(), 10000);
    }

    private onHello(device: Device) {
        const index = this.findIndex(device);
        if (index === -1) {
            // Add device
            this.devices.push(device);
        } else {
            // Replace device
            this.devices.splice(index, 1, device);
        }
    }

    private onGoodbye(device: Device) {
        const index = this.findIndex(device);
        if (index > -1) {
            // Remove device
            this.devices.splice(index, 1);
        }
    }

    private findIndex(device: Device): number {
        return this.devices.findIndex((knownDevice: Device) => knownDevice.macAddress === device.macAddress);
    }
}
</script>

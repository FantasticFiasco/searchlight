<template>
    <div class="animated fadeIn">
        <Device v-for="device in sortedDevices" :key="device.serialNumber" :device="device">
        </Device>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as Axis from 'axis-discovery';

import { DiscoveryService } from '../services';
import Device from '../components/device.vue';

@Component({
    name: 'devices',
    components: {
        Device
    },
})
export default class Devices extends Vue {
    private readonly discoveryService: DiscoveryService;
    private readonly devices: Axis.Device[];

    constructor() {
        super();
        this.discoveryService = new DiscoveryService;
        this.devices = [];
    }

    public get sortedDevices() {
        return this.devices.sort((a: Axis.Device, b: Axis.Device) => {
            if (a.friendlyName === undefined) {
                return -1;
            }

            if (b.friendlyName === undefined) {
                return 1;
            }

            return a.friendlyName.localeCompare(b.friendlyName);
        });
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
        const index = this.findIndex(device);
        if (index === -1) {
            // Add device
            this.devices.push(device);
        } else {
            // Replace device
            this.devices.splice(index, 1, device);
        }
    }

    private onGoodbye(device: Axis.Device) {
        const index = this.findIndex(device);
        if (index > -1) {
            // Remove device
            this.devices.splice(index, 1);
        }
    }

    private findIndex(device: Axis.Device): number {
        return this.devices.findIndex((knownDevice: Axis.Device) =>
            knownDevice.macAddress === device.macAddress);
    }
}
</script>

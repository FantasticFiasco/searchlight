<template>
    <div class="animated fadeIn">
        <h1>Devices</h1>
        <p v-for="i in 100">{{ i }}</p>
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

    public mounted() {
        this.discoveryService.onHello((device: Device) => this.onHello(device));
        this.discoveryService.onGoodbye((device: Device) => this.onGoodbye(device));

        // Trigger the initial search
        this.discoveryService.search();

        // Trigger a new search every 10 seconds
        setInterval(() => this.discoveryService.search(), 10000);
    }

    private onHello(device: Device) {
        console.log('hello', device);
    }

    private onGoodbye(device: Device) {
        console.log('goodbye', device);
    }
}
</script>

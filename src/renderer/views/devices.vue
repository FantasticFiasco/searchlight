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
import Component from 'vue-class-component';

import { DISCOVERY_SERVICE } from '../dependency-injection';
import { DiscoveryService } from '../services';
import Device from '../components/device.vue';
import { Device as DeviceModel } from '../models';

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
        // Vuex prohibits modifying state outside of store modifiers, thus the 'slice'
        return this.$store.state.devices.slice().sort((a: DeviceModel, b: DeviceModel) => {
            return a.name.localeCompare(b.name);
        });
    }

    public mounted() {
        // Trigger the initial search
        this.discoveryService.search();

        // Trigger a new search every 10 seconds
        setInterval(() => this.discoveryService.search(), 10000);
    }
}
</script>

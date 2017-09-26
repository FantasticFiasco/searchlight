<template>
    <div class="animated fadeIn">
        <div class="row">
            <div class="col-sm-6 col-lg-3" v-for="device in devices" :key="device.macAddress">
                <device :device="device" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import 'vuex';
import { Component } from 'vue-property-decorator';

import DeviceComponent from '../components/device.vue';
import { Device } from '../models';

@Component({
    name: 'devices',
    components: {
        'device': DeviceComponent
    },
})
export default class Devices extends Vue {
    public get devices() {
        // Vuex prohibits modifying state outside of store modifiers, thus the 'slice'
        return this.$store.state.devices.slice().sort((a: Device, b: Device) => {
            return (a.name || '').localeCompare(b.name || '');
        });
    }
}
</script>

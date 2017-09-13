<template>
    <div class="animated fadeIn">
        <h1>Devices</h1>
        <p v-for="i in 100">{{ i }}</p>
    </div>
</template>

<script lang="ts">
import { ipcRenderer } from 'electron';
import Vue from 'vue';
import Component from 'vue-class-component';
import { Device } from 'axis-discovery';

import * as ChannelNames from 'common/channel-names';

@Component({
    name: 'devices',
})
export default class Devices extends Vue {
    constructor() {
        super();

        ipcRenderer.send('discovery.search');

        ipcRenderer.on(ChannelNames.DISCOVERY_DEVICE_HELLO, (device: Device) => {
            console.log('hello', device);
        });
    }
}
</script>

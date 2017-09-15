<template>
    <p>
        Device called '{{ name }}'
    </p>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import * as Axis from 'axis-discovery';

@Component({
    name: 'device',
    props: {
        device: {
            type: Axis.Device,
            required: true,
        },
    },
})
export default class Device extends Vue {
    public device: Axis.Device;

    public get name(): string {
        if (this.device.friendlyName) {
            return this.device.friendlyName;
        }

        return 'unknown';
    }
}
</script>


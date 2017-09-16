<template>
    <b-card class="bg-success">
        <div class="card-body pb-0">
            <h5>{{ name }}</h5>
            <p>{{ model }}</p>
        </div>
    </b-card>
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

    public get model(): string {
        if (this.device.modelDescription) {
            return this.device.modelDescription;
        }

        return "";
    }
}
</script>


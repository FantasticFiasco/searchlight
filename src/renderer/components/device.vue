<template>
    <b-card :class="isConnected ? 'bg-primary' : 'bg-danger'" :no-body="true">
        <div class="card-body pb-0">
            <b-dropdown class="float-right" variant="transparent p-0" right>
                <template slot="button-content">
                    <i class="icon-settings"></i>
                </template>
                <b-dropdown-item>Action</b-dropdown-item>
                <b-dropdown-item>Another action</b-dropdown-item>
                <b-dropdown-item>Something else here...</b-dropdown-item>
                <b-dropdown-item disabled>Disabled action</b-dropdown-item>
            </b-dropdown>
            <h4 class="mb-0">{{ name }}</h4>
            <p>{{ model }}</p>
        </div>
    </b-card>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Device as DeviceModel } from '../models';

@Component({
    name: 'device',
    props: {
        device: {
            type: DeviceModel,
            required: true,
        },
    },
})
export default class Device extends Vue {
    private readonly device: DeviceModel;

    public get name(): string {
        return this.device.name;
    }

    public get model(): string {
        return this.device.model;
    }

    public get isConnected(): boolean {
        return this.device.isConnected;
    }
}
</script>

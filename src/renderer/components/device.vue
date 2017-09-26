<template>
    <b-card :no-body="true">
        <div :class="['card-header', isResponsive ? 'bg-primary' : 'bg-danger']">
            <img class="icon" :src="iconUrl" />
            <heartbeats class="chart-wrapper px-3" :timestamp="device.networkStatus.timestamp" style="height:70px;" height="70" />
            <p v-if="!isResponsive">{{ unresponsiveDuration }}</p>
        </div>
        <div class="card-body">
            <h5 class="card-name">{{ name }}</h5>
            <div class="card-model">{{ model }}</div>
            <div class="card-links">
                <div v-if="hasLiveView">
                    <i class="fa fa-eye" />
                    <a @click="openLiveView" href="">Live view</a>
                </div>
                <div v-if="hasProductPage">
                    <i class="fa fa-globe" />
                    <a @click="openProductPage" href="">Product page</a>
                </div>
            </div>
        </div>
    </b-card>
</template>

<script lang="ts">
import { shell } from 'electron';
import Vue from 'vue';
import 'vuex';
import { Component, Prop } from 'vue-property-decorator';

import { Device as Model } from '../models';
import Heartbeats from './heartbeats.vue';

@Component({
    name: 'device',
    components: {
        'heartbeats': Heartbeats,
    }
})
export default class Device extends Vue {
    @Prop({ type: Model })
    private readonly device: Model;

    public get iconUrl(): string {
        return this.device.iconUrl || '';
    }

    public get name(): string {
        return this.device.name || '';
    }

    public get model(): string {
        return this.device.modelDescription || '';
    }

    public get hasLiveView(): boolean {
        return this.device.liveViewUrl !== undefined;
    }

    public get hasProductPage(): boolean {
        return this.device.productPageUrl !== undefined;
    }

    public get isResponsive(): boolean {
        return this.device.networkStatus.isResponsive;
    }

    public get unresponsiveDuration(): string {
        const now = new Date().getTime();
        const duration = now - this.device.networkStatus.timestamp.getTime();

        if (duration < 60000) {
            return '< 1 minute';
        }

        if (duration < 120000) {
            return '> 1 minute';
        }

        return `> ${Math.floor(duration / 60000)} minutes`;
    }

    public openLiveView(e: Event) {
        e.preventDefault();
        if (this.device.liveViewUrl != undefined) {
            shell.openExternal(this.device.liveViewUrl);
        }
    }

    public openProductPage(e: Event) {
        e.preventDefault();
        if (this.device.productPageUrl != undefined) {
            shell.openExternal(this.device.productPageUrl);
        }
    }
}
</script>

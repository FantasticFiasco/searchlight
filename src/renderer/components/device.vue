<template>
    <b-card no-body class="device-card">
        <div :class="['card-header', isResponsive ? 'bg-success' : 'bg-danger']">
            <img :class="isAvailableOnAxisWeb ? 'card-icon' : 'card-icon-hidden'" :src="iconUrl" @error="onInvalidIconUrl" />
            <p v-if="!isResponsive" class="card-no-contact-text">No contact</p>
            <i :class="['card-heart', 'fa', isResponsive ? 'fa-heartbeat' : 'fa-heart-o']" />
            <Heartbeats class="card-heartbeats" :timestamps="timestamps" />
        </div>
        <div class="card-body">
            <h5 class="card-name">{{ name }}</h5>
            <div class="card-model">{{ model }}</div>
            <div class="card-links">
                <div>
                    <i class="fa fa-eye fa-fw" />
                    <a @click="openLiveView" href="#">Live view</a>
                </div>
                <div>
                    <i class="fa fa-info-circle fa-fw" />
                    <a @click="openProductPage" href="#">Product page</a>
                </div>
            </div>
        </div>
    </b-card>
</template>

<script lang="ts">
import { shell } from 'electron';
import Vue from 'vue';
import 'vuex';
import { Component, Inject, Prop } from 'vue-property-decorator';

import { Device as Model } from '../models';
import { ANALYTICS_SERVICE, AnalyticsService, InvalidDeviceIconEvent } from '../services';
import { Heartbeats } from './heartbeats';
import * as axisWeb from './helpers/axis-web';

@Component({
    name: 'device',
    components: {
        Heartbeats,
    }
})
export default class Device extends Vue {
    @Prop({ type: Model })
    private readonly device: Model;

    @Inject(ANALYTICS_SERVICE)
    private readonly analyticsService: AnalyticsService;

    public get iconUrl(): string {
        return axisWeb.iconUrl(this.device.modelNumber);
    }

    public get timestamps(): Date[] {
        return this.$store.state.heartbeats[this.device.macAddress];
    }

    public get name(): string {
        return this.device.name || '';
    }

    public get model(): string {
        return this.device.modelDescription || '';
    }

    public get isResponsive(): boolean {
        return this.device.networkStatus.isResponsive;
    }

    public isAvailableOnAxisWeb = true;

    public openLiveView(e: Event) {
        e.preventDefault();

        const url = this.device.liveViewUrl || `http://${this.device.address}`;
        shell.openExternal(url);
    }

    public openProductPage(e: Event) {
        e.preventDefault();

        shell.openExternal(axisWeb.productPageUrl(this.device.modelName));
    }

    public onInvalidIconUrl(e: Event) {
        this.isAvailableOnAxisWeb = false;

        const event = new InvalidDeviceIconEvent(this.device.modelNumber || 'unknown');
        this.analyticsService.reportEventWithValue(event);
    }
}
</script>

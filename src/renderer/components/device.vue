<template>
    <b-card :no-body="true">
        <div :class="['card-header', isResponsive ? 'bg-primary' : 'bg-danger']">
            <img class="card-icon" :src="iconUrl" @error="onInvalidIconUrl" />
            <p v-if="!isResponsive" class="card-no-contact-text">No contact</p>
            <i :class="['card-heart', 'fa', isResponsive ? 'fa-heartbeat' : 'fa-heart-o']" />
            <heartbeats class="card-heartbeats" :latestTimestamp="latestHeartbeatTimestamp" />
        </div>
        <div class="card-body">
            <h5 class="card-name">{{ name }}</h5>
            <div class="card-model">{{ model }}</div>
            <div class="card-links">
                <div v-if="hasLiveView">
                    <i class="fa fa-eye fa-fw" />
                    <a @click="openLiveView" href="">Live view</a>
                </div>
                <div v-if="hasProductPage">
                    <i class="fa fa-info-circle fa-fw" />
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
import { Component, Inject, Prop } from 'vue-property-decorator';

import { ANALYTICS_SERVICE } from '../dependency-injection';
import { Device as Model } from '../models';
import { AnalyticsService, InvalidDeviceIconEvent } from '../services';
import { Heartbeats } from './heartbeats';

@Component({
    name: 'device',
    components: {
        'heartbeats': Heartbeats,
    }
})
export default class Device extends Vue {
    @Prop({ type: Model })
    private readonly device: Model;

    @Inject(ANALYTICS_SERVICE)
    private readonly analyticsService: AnalyticsService;

    public get iconUrl(): string {
        return this.device.iconUrl || '';
    }

    public get latestHeartbeatTimestamp(): Date {
        return this.device.networkStatus.timestamp;
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

    public onInvalidIconUrl(e: Event) {
        const event = new InvalidDeviceIconEvent(this.device.modelNumber || 'unknown');
        this.analyticsService.reportEventWithValue(event);
    }
}
</script>

<template>
    <b-card :no-body="true">
        <div :class="['card-header', isResponsive ? 'bg-primary' : 'bg-danger']">
            <img :src="iconUrl" alt="Device icon" />
        </div>
        <div class="card-body pb-0">
            <h4 class="mb-0">{{ name }}</h4>
            <p>{{ model }}</p>
            <p v-if="hasLiveView">
                <i class="fa fa-eye"></i>
                <a @click="openLiveView" href="">Live view</a>
            </p>
            <p v-if="hasProductPage">
                <i class="fa fa-globe"></i>
                <a @click="openProductPage" href="">Product page</a>
            </p>
        </div>
    </b-card>
</template>

<script lang="ts">
import { shell } from 'electron';
import Vue from 'vue';
import 'vuex';
import { Component, Prop } from 'vue-property-decorator';
import { Device as Model, NetworkStatus } from '../models';

@Component({ name: 'device' })
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
        return this.device.networkStatus === NetworkStatus.responsive;
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

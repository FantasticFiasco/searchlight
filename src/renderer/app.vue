<template>
    <router-view>
    </router-view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import {
    ANALYTICS_SERVICE,
    AnalyticsService,
    APPLICATION_UPDATES_SERVICE,
    ApplicationUpdatesService,
    AXIS_WEB_SERVICE,
    AxisWebService,
    DEVICE_ICON_SERVICE,
    DeviceIconService,
    DISCOVERY_SERVICE,
    DiscoveryService,
    HEARTBEAT_SERVICE,
    HeartbeatService,
} from './services';
import * as vueHandlers from './vue-handlers';

const analyticsService = new AnalyticsService();
const applicationUpdatesService = new ApplicationUpdatesService();
const axisWebService = new AxisWebService();
const deviceIconService = new DeviceIconService();
const discoveryService = new DiscoveryService();
const heartbeatService = new HeartbeatService(discoveryService);

// Enable reporting exceptions from global handlers
vueHandlers.reportExceptions(analyticsService);

@Component({
    name: 'app',
    provide: {
        [ANALYTICS_SERVICE]: analyticsService,
        [APPLICATION_UPDATES_SERVICE]: applicationUpdatesService,
        [AXIS_WEB_SERVICE]: axisWebService,
        [DEVICE_ICON_SERVICE]: deviceIconService,
        [DISCOVERY_SERVICE]: discoveryService,
        [HEARTBEAT_SERVICE]: heartbeatService,
    },
})
export default class App extends Vue {
}
</script>

<style>
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/css/font-awesome.min.css';

$simple-line-font-path: "~simple-line-icons/fonts/";
@import "~simple-line-icons/css/simple-line-icons.css";

@import '~bootstrap-vue/dist/bootstrap-vue.css';
</style>

<style lang="scss">
// Import Main styles for this application
@import "./scss/style";
</style>

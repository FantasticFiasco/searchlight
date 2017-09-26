<template>
    <router-view>
    </router-view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { DISCOVERY_SERVICE, HEARTBEAT_SERVICE } from './dependency-injection'
import { DiscoveryService, HeartbeatService } from './services';

const discoveryService = new DiscoveryService();
const heartbeatService = new HeartbeatService(discoveryService);

@Component({
    name: 'app',
    provide: {
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

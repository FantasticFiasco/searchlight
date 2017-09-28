<template>
    <router-view>
    </router-view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { DISCOVERY_SERVICE } from './dependency-injection'
import { DiscoveryService } from './services';

@Component({
    name: 'app',
    provide: {
        [DISCOVERY_SERVICE]: new DiscoveryService(),
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

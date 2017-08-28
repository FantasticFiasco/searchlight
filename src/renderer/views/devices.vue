<template>
    <div>
        <h1>Hello World!</h1>
        We are using Node.js {{ nodeVersion() }}, Chromium {{ chromeVersion() }}, Electron {{ electronVersion() }} and app version {{ appVersion() }}.
    </div>
</template>

<script lang="ts">
import { remote } from 'electron';
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class Devices extends Vue {
    nodeVersion() {
        return process.versions.node;
    }

    chromeVersion() {
        return process.versions.chrome;
    }

    electronVersion() {
        return process.versions.electron;
    }

    appVersion() {
        return remote.app.getVersion();
    }
}
</script>

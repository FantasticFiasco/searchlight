<template>
    <div id="app">
        <h1>Hello World!</h1>
        We are using Node.js {{ nodeVersion() }}, Chromium {{ chromeVersion() }}, Electron {{ electronVersion() }} and app version {{ appVersion() }}.
    </div>
</template>

<script lang="ts">
import { remote } from 'electron';
import Vue, { ComponentOptions } from 'vue';

export default {
    methods: {
        nodeVersion() {
            return process.versions.node;
        },
        chromeVersion() {
            return process.versions.chrome;
        },
        electronVersion() {
            return process.versions.electron;
        },
        appVersion() {
            return remote.app.getVersion();
        },
    },
} as ComponentOptions<Vue>
</script>
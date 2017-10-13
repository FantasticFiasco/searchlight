<template>
    <div>
        <h1>About</h1>
        <p>Developed with
            <i class="icon-heart"></i> by the Open Source community</p>
        <p>Application: {{ appVersion }}</p>
        <p>Electron: {{ electronVersion }}</p>
        <p>Node.js: {{ nodeVersion }}</p>
        <p>Chromium: {{ chromeVersion }}</p>
        <p v-for="i in 100">{{ i }}</p>
    </div>
</template>

<script lang="ts">
import { remote } from 'electron';
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({ name: 'app details' })
export default class AppDetails extends Vue {
    get appVersion() {
        return remote.app.getVersion();
    }

    get electronVersion() {
        return process.versions.electron;
    }

    get nodeVersion() {
        return process.versions.node;
    }

    get chromeVersion() {
        return process.versions.chrome;
    }
}
</script>

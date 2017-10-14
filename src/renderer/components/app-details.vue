<template>
    <div>
        <b-card title="Searchlight">
            <p class="card-text">
                Version: {{ appVersion }}
            </p>
            <p class="card-text">
                Report an issue
            </p>
        </b-card>
        <b-card sub-title="Dependencies">
            <b-list-group flush>
                <b-list-group-item>
                    <h4>Searchlight</h4>
                </b-list-group-item>
                <b-list-group-item>
                    <h6>Dependencies</h6>

                </b-list-group-item>
                <b-list-group-item>Electron: {{ electronVersion }}</b-list-group-item>
                <b-list-group-item>Node.js: {{ nodeVersion }}</b-list-group-item>
                <b-list-group-item>Chromium: {{ chromeVersion }}</b-list-group-item>
                <b-list-group-item></b-list-group-item>
            </b-list-group>
        </b-card>
        <b-card no-body>
            <b-card-text>Google Chrome</b-card-text>
            <b-card-text>Copyright 2017 Google Inc. All rights reserved.</b-card-text>

            <!-- <!-- <h1>About</h1>
                                                                                                <p>Developed with
                                                                                                    <i class="icon-heart"></i> by the Open Source community</p>
                                                                                        <p>Application: {{  }}</p>--!> -->
        </b-card>
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

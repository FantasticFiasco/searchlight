<template>
    <div>
        <b-card class="app-details-card">
            <h4 slot="header">Searchlight</h4>
            <div class="app-details-card-container">
                <p>
                    <i class="fa fa-check-circle text-success" /> Version {{ appVersion }}</p>
                <p>
                    <a @click="openIssueWebPage" href="#">Report an issue</a>
                </p>
                <p>
                    Searchlight is made possible by the
                    <a @click="openElectronWebPage" href="#">Electron</a> open source project and the developer friendly APIs provided by
                    <a @click="openAxisCommunicationsWebPage" href="#">Axis Communications</a>.
                </p>
            </div>
        </b-card>
        <b-card class="app-details-card">
            <h6 slot="header">Dependencies</h6>
            <div class="app-details-card-container">
                <p>
                    Searchlight has dependencies to the following components:
                </p>
                <ul>
                    <li>Electron version {{ electronVersion }}</li>
                    <li>Node.js version {{ nodeVersion }}</li>
                    <li>Chromium version {{ chromeVersion }}</li>
                </ul>
            </div>
        </b-card>
        <b-card class="app-details-card">
            <h6 slot="header">Legal</h6>
            <div class="app-details-card-container">
                <p>
                    <a @click="openLicenseWebPage" href="#">License</a>
                </p>
                <p>Copyright 2017 Mattias Kindborg</p>
            </div>
        </b-card>
    </div>
</template>

<script lang="ts">
import { remote, shell } from 'electron';
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

    public openIssueWebPage(e: Event) {
        e.preventDefault();

        shell.openExternal('https://github.com/FantasticFiasco/searchlight/issues/new');
    }

    public openElectronWebPage(e: Event) {
        e.preventDefault();

        shell.openExternal('https://electron.atom.io/');
    }

    public openAxisCommunicationsWebPage(e: Event) {
        e.preventDefault();

        shell.openExternal('https://www.axis.com/');
    }

    public openLicenseWebPage(e: Event) {
        e.preventDefault();

        shell.openExternal('https://github.com/FantasticFiasco/searchlight/blob/master/LICENSE');
    }
}
</script>

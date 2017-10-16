<template>
    <div>
        <b-card class="app-details-card">
            <div slot="header">
                <img src="../assets/app-icon_48x48.png" />
                <h4 class="app-title">Searchlight</h4>
            </div>
            <div class="app-details-card-container">
                <p>
                    Version {{ appVersion }}
                </p>
                <p v-if="isCheckingForUpdates">
                    <i class="fa fa-refresh fa-spin fa-fw text-primary" /> Checking for updates
                </p>
                <p v-else-if="isDownloading">
                    <i class="fa fa-refresh fa-spin fa-fw text-primary" /> Downloading updates ({{ downloadProgress }}%)
                </p>
                <p v-else-if="isRequiringRestart">
                    <b-button @click="restartToUpdate" variant="primary">Restart to update</b-button>
                </p>
                <p v-else>
                    <i class="fa fa-check-circle fa-fw text-success" /> Application is up to date
                </p>
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
import { Component, Inject } from 'vue-property-decorator';

import { APPLICATION_UPDATES_SERVICE, ApplicationUpdatesService } from '../services';
import { ApplicationUpdatesState } from '../store';

@Component({ name: 'app-details' })
export default class AppDetails extends Vue {
    @Inject(APPLICATION_UPDATES_SERVICE)
    private readonly applicationUpdatesService: ApplicationUpdatesService;

    public get isCheckingForUpdates(): boolean {
        return this.$store.state.applicationUpdates.state === ApplicationUpdatesState.CHECKING;
    }

    public get isDownloading(): boolean {
        return this.$store.state.applicationUpdates.state === ApplicationUpdatesState.DOWNLOADING;
    }

    public get isRequiringRestart(): boolean {
        return this.$store.state.applicationUpdates.state === ApplicationUpdatesState.RESTART_REQUIRED;
    }

    public get downloadProgress(): number | undefined {
        return this.$store.state.applicationUpdates.downloadProgress;
    }

    public get appVersion(): string {
        return remote.app.getVersion();
    }

    get electronVersion(): string {
        return process.versions.electron;
    }

    get nodeVersion(): string {
        return process.versions.node;
    }

    get chromeVersion(): string {
        return process.versions.chrome;
    }

    public restartToUpdate(e: Event) {
        this.applicationUpdatesService.restartToUpdate();
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

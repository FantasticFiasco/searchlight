<template>
    <div>
        <b-card class="app-details-card">
            <div slot="header">
                <img class="app-icon" src="../assets/favicon-120.png" />
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
                <p v-else-if="canApplyUpdates">
                    <b-button @click="applyUpdates" variant="primary" v-html="applyUpdatesButtonText" />
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
                    Application has dependencies to the following components:
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
                    Application is not in any way affiliated with Axis Communications.
                </p>
                <p>
                    <a @click="openLicenseWebPage" href="#">License</a>
                </p>
                <p>© Copyright 2017-2019 Mattias Kindborg</p>
            </div>
        </b-card>
    </div>
</template>

<script lang="ts">
import { remote, shell } from 'electron';
import Vue from 'vue';
import { Component, Inject } from 'vue-property-decorator';

import { platform, Platform } from 'common';
import { GitHub } from 'common/git-hub';
import { APPLICATION_UPDATES_SERVICE, ApplicationUpdatesService } from '../services';
import { ApplicationUpdatesState } from '../store';

@Component({ name: 'app-details' })
export default class AppDetails extends Vue {
    private readonly gitHub = new GitHub();

    @Inject(APPLICATION_UPDATES_SERVICE)
    private readonly applicationUpdatesService: ApplicationUpdatesService;

    public get isCheckingForUpdates(): boolean {
        return this.$store.state.applicationUpdates.state === ApplicationUpdatesState.Checking;
    }

    public get isDownloading(): boolean {
        return this.$store.state.applicationUpdates.state === ApplicationUpdatesState.Downloading;
    }

    public get canApplyUpdates(): boolean {
        switch (platform()) {
            // Since application isn't signed, automatically installing the updates
            // on macOS isn't possible. Instead we let the user download the
            // updates and manually install them.
            case Platform.MacOS:
                return this.$store.state.applicationUpdates.state === ApplicationUpdatesState.UpdatesAvailable;
            default:
                return this.$store.state.applicationUpdates.state === ApplicationUpdatesState.RestartRequired;
        }
    }

    public get applyUpdatesButtonText(): string {
        switch (platform()) {
            case Platform.MacOS:
                return 'New version available!<br>Download it now';
            default:
                return 'New version available!<br>Restart to update';
        }
    }

    public get downloadProgress(): number {
        return Math.round(this.$store.state.applicationUpdates.downloadProgress);
    }

    public get appVersion(): string {
        return remote.app.getVersion();
    }

    public get electronVersion(): string {
        return process.versions.electron;
    }

    public get nodeVersion(): string {
        return process.versions.node;
    }

    public get chromeVersion(): string {
        return process.versions.chrome;
    }

    public applyUpdates(e: Event) {
        this.applicationUpdatesService.applyUpdates();
    }

    public openIssueWebPage(e: Event) {
        e.preventDefault();

        this.gitHub.openIssueWebPage();
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

        this.gitHub.openLicenseWebPage();
    }
}
</script>

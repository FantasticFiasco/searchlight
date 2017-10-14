<template>
    <div>
        <b-card class="app-details-card">
            <h4 slot="header">Searchlight</h4>
            <div class="ml-2">
                <p class="card-text">
                    <i class="fa fa-check-circle text-success" /> Version {{ appVersion }}
                </p>
                <p class="card-text">
                    <a @click="openIssueWebPage" href="">Report an issue</a>
                </p>
                <p class="card-text">Searchlight is made possible by the
                    <a @click="openElectronWebPage" href="#">Electron</a> open source project and the APIs provided by
                    <a @click="openAxisCommunicationsWebPage" href="#">Axis Communications</a>.
                </p>
            </div>
        </b-card>
        <b-card class="app-details-card">
            <h6 slot="header">Dependencies</h6>
            <div class="ml-2">
                <p class="card-text">
                    Searchlight has dependencies to the following components:
                </p>
                <ul>
                    <li class="card-text">
                        Electron version {{ electronVersion }}
                    </li>
                    <li class="card-text">
                        Node.js version {{ nodeVersion }}
                    </li>
                    <li class="card-text">
                        Chromium version {{ chromeVersion }}
                    </li>
                </ul>
            </div>
        </b-card>
        <b-card class="app-details-card">
            <h6 slot="header">Legal</h6>
            <div class="ml-2">
                <p class="card-text">
                    <a @click="openLicenseWebPage" href="#">License</a>
                </p>
                <p class="card-text">Copyright 2017 Mattias Kindborg</p>
            </div>
        </b-card>
    </div>
</template>

<script lang="ts">
import { shell } from 'electron';
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

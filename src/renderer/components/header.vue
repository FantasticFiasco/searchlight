<template>
    <header class="app-header navbar">
        <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
        <b-link class="navbar-brand" to="#"></b-link>
        <button class="navbar-toggler sidebar-toggler d-md-down-none" type="button" @click="sidebarMinimize">&#9776;</button>
    </header>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({ name: 'header' })
export default class Header extends Vue {
    public mobileSidebarToggle(e: Event) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-mobile-show');
    }

    public sidebarMinimize(e: Event) {
        e.preventDefault();
        document.body.classList.toggle('sidebar-minimized');
    }
}
</script>

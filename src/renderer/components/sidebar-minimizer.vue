<template>
    <button class="sidebar-minimizer" type="button" @click="sidebarMinimize" />
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({ name: 'sidebar-minimizer' })
export default class SidebarMinimizer extends Vue {
    public sidebarMinimize() {
        document.body.classList.toggle('sidebar-minimized')
    }
}
</script>

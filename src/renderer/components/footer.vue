<template>
    <footer class="app-footer">
        <span>{{ deviceCount }}</span>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import 'vuex';
import { Component } from 'vue-property-decorator';

@Component({ name: 'footer' })
export default class Footer extends Vue {
    public get deviceCount(): string {
        const deviceCount = this.$store.state.devices.length;
        switch (deviceCount) {
            case 0:
                return '';
            case 1:
                return '1 device found';
            default:
                return `${deviceCount} devices found`;
        }
    }
}
</script>

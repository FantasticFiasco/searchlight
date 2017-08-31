<template>
    <router-view>
    </router-view>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class App extends Vue {
}
</script>

<style lang="scss">
// Import Main styles for this application
@import "./scss/style";
</style>

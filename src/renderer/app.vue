<template>
    <router-view>
    </router-view>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'app',
})
export default class App extends Vue {
}
</script>

<style>
// Import Simple Line Icons Set
$simple-line-font-path: "~simple-line-icons/fonts/";
@import "~simple-line-icons/css/simple-line-icons.css";
</style>

<style lang="scss">
// Import Main styles for this application
@import "./scss/style";
</style>

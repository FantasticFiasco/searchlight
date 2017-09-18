<template>
    <footer class="app-footer">
        <div v-if="count === 0">No devices found</div>
        <div v-if="count === 1">1 device found</div>
        <div v-if="count > 1">{{ count }} devices found</div>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import 'vuex';
import Component from 'vue-class-component';

@Component({
    name: 'footer',
})
export default class Footer extends Vue {
    public get count() {
        return this.$store.state.devices.length;
    }
}
</script>

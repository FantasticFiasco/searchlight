<template>
    <footer class="app-footer">
        <div v-if="deviceCount === 0">No devices found</div>
        <div v-if="deviceCount === 1">1 device found</div>
        <div v-if="deviceCount > 1">{{ deviceCount }} devices found</div>
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
    public get deviceCount() {
        return this.$store.getters.deviceCount;
    }
}
</script>

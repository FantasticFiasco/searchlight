<template>
    <footer class="app-footer">
        {{ count }} device / ? devices
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

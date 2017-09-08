<template>
    <footer class="app-footer">
        <a href="http://coreui.io">CoreUI</a> &copy; 2017 creativeLabs.
        <span class="float-right">Powered by
            <a href="http://coreui.io">CoreUI</a>
        </span>
    </footer>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'footer',
})
export default class Footer extends Vue {
}
</script>


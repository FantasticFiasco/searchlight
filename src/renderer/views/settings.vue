<template>
    <div class="animated fadeIn">
        <h1>Settings</h1>
        <p v-for="i in 100">{{ i }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'settings',
})
export default class Settings extends Vue {
}
</script>


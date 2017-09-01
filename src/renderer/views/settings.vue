<template>
    <div>
        <p>Settings</p>
        <p v-for="i in 100">{{ i }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

@Component
export default class Settings extends Vue {
}
</script>


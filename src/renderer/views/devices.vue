<template>
    <div>
        <h1>Devices</h1>
        <p v-for="i in 100">{{ i }}</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'devices',
})
export default class Devices extends Vue {
}
</script>

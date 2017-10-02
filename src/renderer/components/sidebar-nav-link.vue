<template>
    <router-link :to="url" class="nav-link">
        <i :class="icon"></i> {{ name }}
    </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component({ name: 'sidebar-nav-link' })
export default class SidebarNavLink extends Vue {
    @Prop({ type: String, default: '' })
    public name: string;

    @Prop({ type: String, default: '' })
    public url: string;

    @Prop({ type: String, default: '' })
    public icon: string;
}
</script>


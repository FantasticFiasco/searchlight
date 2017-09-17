<template>
    <router-link :to="url" class="nav-link">
        <i :class="icon"></i> {{ name }}
    </router-link>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

@Component({
    name: 'sidebar-nav-link',
    props: {
        name: {
            type: String,
            required: true,
            default: '',
        },
        url: {
            type: String,
            required: true,
            default: '',
        },
        icon: {
            type: String,
            required: true,
            default: '',
        },
    },
})
export default class SidebarNavLink extends Vue {
    public name: string;
    public url: string;
    public icon: string;
}
</script>


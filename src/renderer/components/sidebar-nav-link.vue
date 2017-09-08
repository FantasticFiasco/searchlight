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
        name: String,
        url: String,
        icon: String,
    },
})
export default class SidebarNavLink extends Vue {
    name: string = '';
    url: string = '';
    icon: string = '';
}
</script>


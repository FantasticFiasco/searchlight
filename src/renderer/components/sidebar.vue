<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <div slot="header"></div>
            <ul class="nav">
                <li class="nav-item" v-for="(item, index) in navItems" :key="item.url">
                    <template>
                        <SidebarNavLink :name="item.name" :url="item.url" :icon="item.icon" />
                    </template>
                </li>
            </ul>
            <slot></slot>
            <div slot="footer"></div>
        </nav>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

import { IView } from '../views/iview';
import SidebarNavLink from './sidebar-nav-link.vue';

@Component({
    name: 'sidebar',
    props: {
        navItems: {
            type: Array,
            required: true,
        },
    },
    components: {
        SidebarNavLink,
    },
})
export default class Sidebar extends Vue {
    public navItems: Array<IView>;

    public handleClick(e: Event) {
        e.preventDefault();

        const nodeTarget = e.target as Node;

        if (nodeTarget.parentElement) {
            nodeTarget.parentElement.classList.toggle('open');
        }
    }
}
</script>

<style lang="css">
.nav-link {
    cursor: pointer;
}
</style>

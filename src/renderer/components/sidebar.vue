<template>
    <div class="sidebar">
        <SidebarMinimizer />
        <nav class="sidebar-nav">
            <ul class="nav">
                <li class="nav-item" v-for="item in navItems" :key="item.url">
                    <template>
                        <SidebarNavLink :name="item.name" :url="item.url" :icon="item.icon" :badge="item.badge" />
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
import { Component, Prop } from 'vue-property-decorator';

import { IView } from '../views/iview';
import SidebarMinimizer from './sidebar-minimizer.vue';
import SidebarNavLink from './sidebar-nav-link.vue';

@Component({
    name: 'sidebar',
    components: {
        SidebarMinimizer,
        SidebarNavLink,
    },
})
export default class Sidebar extends Vue {
    @Prop({ type: Array })
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

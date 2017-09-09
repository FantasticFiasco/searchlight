<template>
    <ol class="breadcrumb">
        <li class="breadcrumb-item" v-for="(item, index) in list" :key="item.name">
            <span class="active" v-if="isLast(index)">{{ item.name }}</span>
            <router-link :to="item.path" v-else>{{ item.name }}</router-link>
        </li>
    </ol>
</template>

<script lang="ts">
import Vue from 'vue';
import { RouteRecord } from 'vue-router';
import Component from 'vue-class-component';

@Component({
    name: 'breadcrumb',
    props: {
        list: {
            type: Array,
            required: true,
            default: [],
        },
    },
})
export default class Breadcrumb extends Vue {
    list: Array<RouteRecord>;

    isLast(index: number): boolean {
        return index === this.list.length - 1;
    }
}
</script>


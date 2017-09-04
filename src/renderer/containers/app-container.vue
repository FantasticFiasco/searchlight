<template>
    <div class="app">
        <Header/>
        <div class="app-body">
            <main class="main">
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
            <Aside/>
        </div>
        <Footer/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

import Aside from '../components/aside.vue'
import Footer from '../components/footer.vue'
import Header from '../components/header.vue'

@Component({
    components: {
        Aside,
        Footer,
        Header,
    }
})
export default class AppContainer extends Vue {
}
</script>

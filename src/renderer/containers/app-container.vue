<template>
    <div class="app">
        <Header/>
        <div class="app-body">
            <main class="main">
                <div class="container-fluid">
                    <router-view></router-view>
                </div>
            </main>
        </div>
        <Footer/>
    </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';

import Footer from '../components/footer.vue'
import Header from '../components/header.vue'

@Component({
    components: {
        Footer,
        Header,
    }
})
export default class AppContainer extends Vue {
}
</script>

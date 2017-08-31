<template>
    <div class="app">
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

@Component({
    components: {
        Footer,
    }
})
export default class AppContainer extends Vue {
}
</script>

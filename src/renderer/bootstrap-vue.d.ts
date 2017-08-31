declare module 'bootstrap-vue' {
    import { PluginFunction, PluginObject } from 'vue';

    class BootstrapVue implements PluginObject<{}> {
        [key: string]: any;
        public install: PluginFunction<{}>;
    }

    export default new BootstrapVue();
}

declare module 'bootstrap-vue' {
    import { PluginFunction, PluginObject } from 'vue';

    class BootstrapVue implements PluginObject<{}> {
        [key: string]: any;
        public install: PluginFunction<{}>;
    }

    let _default: BootstrapVue;

    export default _default;
}

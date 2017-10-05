declare module 'vue-chartjs' {
    import Vue from 'vue';
    class Bar extends Vue {
        public renderChart(data: any, options: any): void;
        public _chart: Chart;
    }
    class Chart {
        public update(): void;
    }
}

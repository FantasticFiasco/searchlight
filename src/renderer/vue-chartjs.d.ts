declare module 'vue-chartjs' {
    import Vue from 'vue';

    class Bar extends Vue {
        public _chart: Chart;
        public renderChart(data: any, options: any): void;
    }

    class Chart {
        public update(): void;
        public destroy(): void;
    }
}

import 'chart.js';
import { Bar } from 'vue-chartjs';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({ name: 'heartbeats' })
export class Heartbeats extends Bar {
    private readonly historyDuration = 5 * 60 * 1000;
    private readonly intervalDuration = 15 * 1000;
    private readonly intervals: number[] = [];

    @Prop({ type: Date })
    public latestTimestamp: Date;

    /**
     * Initializes a new instance of the class.
     */
    constructor() {
        super();

        // A history of 5 minutes split into 15 second intervals results in 20 intervals
        const numberOfIntervals = this.historyDuration / this.intervalDuration;
        for (let count = 0; count < numberOfIntervals; count++) {
            this.intervals.push(0);
        }
    }

    public mounted() {
        this.renderChart(
            {
                labels: [
                    '', '', '', '',
                    '', '', '', '',
                    '', '', '', '',
                    '', '', '', '',
                    '', '', '', '',
                ],
                datasets: [
                    {
                        backgroundColor: 'rgba(255,255,255,.5)',
                        borderColor: 'transparent',
                        data: this.intervals,
                    },
                ],
            },
            {
                maintainAspectRatio: false,
                legend: {
                    display: false,
                },
                scales: {
                    xAxes: [{
                        display: false,
                        categoryPercentage: 1,
                        barPercentage: 0.5,
                    }],
                    yAxes: [{
                        display: false,
                        ticks: {
                            suggestedMin: 0,
                            suggestedMax: 2,
                        },
                    }],
                },
                tooltips: {
                    enabled: false,
                },
            },
        );

        // Move history every 15 seconds, starting on the next 0, 15, 30 or
        // 45 seconds, thus syncronizing all devices to update at the same time
        const offset = this.intervalDuration - new Date().getTime() % this.intervalDuration;
        setTimeout(() => setInterval(this.moveHistory, this.intervalDuration), offset);
    }

    @Watch('latestTimestamp')
    public incrementHitsInInterval(value: Date, oldValue: Date) {
        const now = new Date();
        const latestIntervalIndex = this.intervals.length - 1;
        const intervalIndex = latestIntervalIndex - Math.floor((now.getTime() - value.getTime()) / this.intervalDuration);

        if (intervalIndex < this.intervals.length) {
            this.intervals[intervalIndex]++;
            this._chart.update();
        }
    }

    private moveHistory() {
        this.intervals.push(0);
        this.intervals.shift();
        this._chart.update();
    }
}

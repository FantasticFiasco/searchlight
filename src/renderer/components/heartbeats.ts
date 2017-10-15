import 'chart.js';
import { Bar } from 'vue-chartjs';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({ name: 'heartbeats' })
export class Heartbeats extends Bar {
    private readonly historyDuration = 5 * 60 * 1000;
    private readonly intervalDuration = 15 * 1000;
    private readonly intervals: number[] = [];

    @Prop({ type: Array, default: [] })
    public readonly timestamps: Date[];

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
        const now = new Date().getTime();
        const offset = this.intervalDuration - now % this.intervalDuration;
        setTimeout(() => setInterval(this.moveHistory, this.intervalDuration), offset);
    }

    public beforeDestroy() {
        if (this._chart) {
            this._chart.destroy();
        }
    }

    @Watch('timestamps', { deep: true })
    public updateIntervalls(value: Date[], oldValue: Date[]) {
        // Clear intervalls from old timestamps
        for (let intervall of this.intervals) {
            intervall = 0;
        }

        // Update intervalls with updated timestamps
        const now = new Date();
        const latestIntervalIndex = this.intervals.length - 1;

        for (const timestamp of value) {
            const intervalIndex = latestIntervalIndex - Math.floor((now.getTime() - timestamp.getTime()) / this.intervalDuration);
            if (intervalIndex < this.intervals.length) {
                this.intervals[intervalIndex]++;
            }
        }

        this._chart.update();
    }

    private moveHistory() {
        this.intervals.push(0);
        this.intervals.shift();
        this._chart.update();
    }
}

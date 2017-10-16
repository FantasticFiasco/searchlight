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
        this.intervals = this.createArray(numberOfIntervals, 0);
    }

    public mounted() {
        this.renderChart(
            {
                labels: this.createArray(this.intervals.length, ''),
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
        // 45 seconds, thus syncronizing all devices to move their history at
        // the same time
        setTimeout(
            () => setInterval(this.moveHistory, this.intervalDuration),
            this.timeLeftInInterval());
    }

    public beforeDestroy() {
        if (this._chart) {
            this._chart.destroy();
        }
    }

    @Watch('timestamps')
    public updateIntervals(value: Date[], oldValue: Date[]) {
        // Clear intervals from old timestamps
        this.intervals.fill(0);

        // Fill intervals with updated timestamps
        const latestIntervalStart = new Date().getTime() - this.timeIntoInterval();
        const latestIntervalIndex = this.intervals.length - 1;

        for (const timestamp of value) {
            const intervalIndex = latestIntervalIndex - Math.floor((latestIntervalStart - timestamp.getTime()) / this.intervalDuration);
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

    private timeIntoInterval(): number {
        const now = new Date().getTime();
        return now % this.intervalDuration;
    }

    private timeLeftInInterval(): number {
        return this.intervalDuration - this.timeIntoInterval();
    }

    private createArray<T>(length: number, initialValue: T): T[] {
        const array: T[] = [];

        for (let index = 0; index < length; index++) {
            array.push(initialValue);
        }

        return array;
    }
}

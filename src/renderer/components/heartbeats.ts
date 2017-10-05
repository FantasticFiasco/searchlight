import 'chart.js';
import { Bar } from 'vue-chartjs';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({ name: 'heartbeats' })
export class Heartbeats extends Bar {
    private readonly timestampHistory: number[] = [];
    // A history of 5 minutes split into 15 second intervals results in 20 bars
    private readonly numberOfBars = 20;
    private readonly updateHistoryInterval = 15000;

    @Prop({ type: Date })
    public latestTimestamp: Date;

    /**
     * Initializes a new instance of the class.
     */
    constructor() {
        super();

        for (let count = 0; count < this.numberOfBars; count++) {
            this.timestampHistory.push(0);
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
                        backgroundColor: 'rgba(255,255,255,.3)',
                        borderColor: 'transparent',
                        data: this.timestampHistory,
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
                            suggestedMax: 5,
                        },
                    }],
                },
                tooltips: {
                    enabled: false,
                },
            },
        );

        // Update history with a fixed interval
        setInterval(this.updateHistory, this.updateHistoryInterval);
    }

    @Watch('latestTimestamp')
    public incrementCurrentBar(value: Date, oldValue: Date) {
        console.log('incrementCurrentBar', value, oldValue);
        this.timestampHistory[this.numberOfBars - 1]++;
        this._chart.update();
    }

    private updateHistory() {
        this.timestampHistory.splice(this.timestampHistory.length, 0, 0);
        this.timestampHistory.shift();
        this._chart.update();
    }
}

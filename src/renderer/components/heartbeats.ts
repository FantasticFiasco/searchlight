import 'chart.js';
import { Bar } from 'vue-chartjs';
import { Component, Prop } from 'vue-property-decorator';

@Component({ name: 'heartbeats' })
export class Heartbeats extends Bar {
    private readonly timestampHistory: number[];

    @Prop({ type: Date })
    private latestTimestamp: Date;

    /**
     * Initializes a new instance of the class.
     */
    constructor() {
        super();

        // A history of 5 minutes split into 15 second intervals results in 20 bars
        this.timestampHistory = [
            UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE,
            UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE,
            UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE,
            UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE,
            UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE, UNRESPONSIVE_VALUE, RESPONSIVE_VALUE,
        ];
    }

    public mounted() {
        this.renderChart(
            {
                labels: LABELS,
                datasets: [
                    {
                        backgroundColor: BACKGROUND_COLOR,
                        borderColor: BORDER_COLOR,
                        data: this.timestampHistory,
                    },
                ],
            },
            OPTIONS,
        );

        // Update the history every 15 seconds
        setInterval(this.updateHistory, UPDATE_HISTORY_INTERVAL);
    }

    private updateHistory() {
        // const newValue = new Date().getTime() - this.timestamp.getTime() > FIFTEEN_SECONDS ?
        //     BAR_RESPONSIVE :
        //     BAR_UNRESPONSIVE;

        // this.data.splice(this.data.length, 0, newValue);
        // this.data.shift();
        console.log('updateHistory', this.latestTimestamp);
    }
}

const UPDATE_HISTORY_INTERVAL = 15000;
const UNRESPONSIVE_VALUE: number = 1;
const RESPONSIVE_VALUE = 5;
const BACKGROUND_COLOR = 'rgba(255,255,255,.3)';
const BORDER_COLOR = 'transparent';

const LABELS = [
    '', '', '', '',
    '', '', '', '',
    '', '', '', '',
    '', '', '', '',
    '', '', '', '',
];

const OPTIONS: any = {
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
};

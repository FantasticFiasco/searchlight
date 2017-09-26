<script lang="ts">
import Component from 'vue-class-component';
import 'chart.js';
import { Bar } from 'vue-chartjs';
//import reactiveData from mixins;

@Component({
    name: 'heartbeats',
    props: {
        timestamp: {
            type: Date,
            required: true,
        },
    },
})
export default class Heartbeats extends Bar {
    private data: Array<number>;
    private timestamp: Date;

    public created() {
        this.data = BAR_INITIAL_DATA.slice();
    }

    public mounted() {
        this.renderChart(
            {
                labels: BAR_LABELS,
                datasets: [
                    {
                        backgroundColor: 'rgba(255,255,255,.3)',
                        borderColor: 'transparent',
                        data: this.data,
                    },
                ],
            },
            BAR_OPTIONS,
        );

        setInterval(this.updateData, FIFTEEN_SECONDS);
    }

    private updateData() {
        const newValue = new Date().getTime() - this.timestamp.getTime() > FIFTEEN_SECONDS ?
            BAR_RESPONSIVE :
            BAR_UNRESPONSIVE;

        this.data.splice(this.data.length, 0, newValue);
        this.data.shift();
    }
}

const FIFTEEN_SECONDS = 15000;

const BAR_RESPONSIVE = 5;

const BAR_UNRESPONSIVE = 1;

// A history of 5 minutes split into 15 second intervals results in 20 bars
const BAR_LABELS = [
    '', '', '', '',
    '', '', '', '',
    '', '', '', '',
    '', '', '', '',
    '', '', '', ''
];

const BAR_INITIAL_DATA = [
    BAR_UNRESPONSIVE, BAR_UNRESPONSIVE, BAR_UNRESPONSIVE, BAR_UNRESPONSIVE,
    BAR_UNRESPONSIVE, BAR_UNRESPONSIVE, BAR_UNRESPONSIVE, BAR_UNRESPONSIVE,
    BAR_UNRESPONSIVE, BAR_UNRESPONSIVE, BAR_UNRESPONSIVE, BAR_UNRESPONSIVE,
    BAR_UNRESPONSIVE, BAR_UNRESPONSIVE, BAR_UNRESPONSIVE, BAR_UNRESPONSIVE,
    BAR_UNRESPONSIVE, BAR_UNRESPONSIVE, BAR_UNRESPONSIVE, BAR_RESPONSIVE,
];

const BAR_OPTIONS: any = {
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
}
</script>

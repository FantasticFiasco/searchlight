import * as Axis from 'axis-discovery';

/**
 * Class discovering Axis devices on the network.
 */
export class Discovery {
    private readonly discovery: Axis.Discovery;
    private searchInterval: NodeJS.Timer;

    /**
     * Initializes a new instance of the class.
     */
    constructor() {
        this.discovery = new Axis.Discovery();
        this.discovery.onHello(this.onHello);
        this.discovery.onGoodbye(this.onGoodbye);
    }

    /**
     * Start listen for device advertisements on all network interface
     * addresses and repeatedly trigger a search for devices.
     */
    public async start(): Promise<void> {
        await this.discovery.start();

        // Trigger a new search every 10 seconds
        this.searchInterval = setInterval(
            async () => this.discovery.search(),
            10000);
    }

    /**
     * Stop listening for device advertisements.
     */
    public async stop(): Promise<void> {
        await this.discovery.stop();

        // Stop search trigger
        clearInterval(this.searchInterval);
    }

    private onHello(device: Axis.Device) {
        console.log('hello', device);
    }

    private onGoodbye(device: Axis.Device) {
        console.log('goodbye', device);
    }
}

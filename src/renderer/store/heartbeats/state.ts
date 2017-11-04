export class State {
    [macAddress: string]: Date[];
}

// tslint:disable:max-classes-per-file
export class Heartbeat {
    public macAddress: string;
    public timestamp: Date;
}

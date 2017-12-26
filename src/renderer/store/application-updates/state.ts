export class State {
    public state = ApplicationUpdatesState.Idle;
    public downloadProgress = 0;
}

export enum ApplicationUpdatesState {
    Idle = 1,
    Checking,
    Downloading,
    RestartRequired,
}

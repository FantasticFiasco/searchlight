export class State {
    public state = ApplicationUpdatesState.IDLE;
    public downloadProgress = 0;
}

export enum ApplicationUpdatesState {
    IDLE = 1,
    CHECKING,
    DOWNLOADING,
    RESTART_REQUIRED,
}

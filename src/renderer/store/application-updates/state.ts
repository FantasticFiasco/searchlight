export class State {
    public state: ApplicationUpdatesState;
    public downloadProgress: number | undefined;
}

export enum ApplicationUpdatesState {
    IDLE = 1,
    CHECKING,
    DOWNLOADING,
    RESTART_REQUIRED,
}

export class State {
    public state: ApplicationUpdatesState;
    public downloadProgress: number | undefined;
}

export enum ApplicationUpdatesState {
    IDLE,
    CHECKING,
    DOWNLOADING,
    RESTART_REQUIRED,
}

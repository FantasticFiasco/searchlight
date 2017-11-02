/**
 * Event describing that no application updates are available, i.e. the
 * current version is latest.
 */
export class NoUpdatesAvailableEvent {
    /**
     * The event kind.
     */
    public readonly kind = 'no-updates-available';
}

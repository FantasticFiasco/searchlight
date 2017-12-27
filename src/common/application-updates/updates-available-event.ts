/**
 * Event describing that application updates are available. This event will
 * only be sent on platforms that don't automatically download and apply the
 * updates.
 */
export class UpdatesAvailableEvent {
    /**
     * The event kind.
     */
    public readonly kind = 'updates-available';
}

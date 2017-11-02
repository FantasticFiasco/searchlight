/**
 * Event describing that a restart is required in order to apply the
 * application updates.
 */
export class RestartRequiredEvent {
    /**
     * The event kind.
     */
    public readonly kind = 'restart-required';
}

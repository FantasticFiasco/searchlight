/**
 * Analytics event with a value.
 */
export abstract class ValueEvent {
    /**
     * Initializes a new instance of the class.
     * @param category category of the event
     * @param action name of the action
     * @param label label of the value
     * @param value value
     */
    constructor(
        /**
         * The category of the event.
         */
        public readonly category: string,
        /**
         * The name of the action.
         */
        public readonly action: string,
        /**
         * The label of the value.
         */
        public readonly label: string,
        /**
         * The value.
         */
        public readonly value?: number) {
    }
}

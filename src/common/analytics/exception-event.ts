/**
 * Analytics event with an exception.
 */
export class ExceptionEvent {
    /**
     * Initializes a new instance of the class.
     * @param description description of the exception
     */
    constructor(
       /**
        * The description of the exception.
        */
       public readonly description: string) {
    }
}

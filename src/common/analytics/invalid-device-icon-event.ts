import { EventWithValue } from './event-with-value';

/**
 * Event send when device icon isn't found on www.axis.com.
 */
export class InvalidDeviceIconEvent extends EventWithValue {
    /**
     * Initializes a new instance of the class.
     * @param modelNumber The model number
     */
    constructor(modelNumber: string) {
        super('www.axis.com', 'invalidDeviceIcon', 'modelNumber', modelNumber);
    }
}

import { EventWithValue } from './event-with-value';

/**
 * Analytics event describing that a device icon isn't found on www.axis.com.
 */
export class InvalidDeviceIconEvent extends EventWithValue {
    /**
     * Initializes a new instance of the class.
     * @param modelNumber The model number
     */
    constructor(modelNumber: string) {
        super('www.axis.com', 'invalid device icon', modelNumber);
    }
}

import { ValueEvent } from './value-event';

/**
 * Analytics event describing that a device icon isn't found on www.axis.com.
 */
export class InvalidDeviceIconEvent extends ValueEvent {
    /**
     * Initializes a new instance of the class.
     * @param modelNumber the model number
     */
    constructor(modelNumber: string) {
        super('www.axis.com', 'invalid device icon', modelNumber);
    }
}

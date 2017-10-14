import ElectronStore from 'electron-store';
import * as uuid from 'uuid';

/**
 * Class responsible for holding the application state of the main process.
 */
export class Store extends ElectronStore {
    /**
     * Initializes a new instance of the class.
     */
    constructor() {
        super(options);
    }
}

const options = {
    defaults: {
        analytics: {
            clientId: uuid.v4(),
            userId: uuid.v4(),
        },
    },
};

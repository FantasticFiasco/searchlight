import * as expect from '@fantasticfiasco/expect';

/**
 * Analytics page view describing the interactions of a user.
 */
export class PageView {
    /**
     * Initializes a new instance of the class.
     * @param path path of the viewed page, must start with '/'
     */
    constructor(public readonly path: string) {
        expect.toExist(path);
        expect.toBeTrue(path.startsWith('/'));
    }
}

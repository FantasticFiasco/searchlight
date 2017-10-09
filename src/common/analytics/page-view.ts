/**
 * Event send when a page is viewed.
 */
export class PageView {
    /**
     * Initializes a new instance of the class.
     * @param path path of the viewed page, must start with '/'
     */
    constructor(public readonly path: string) {
    }
}

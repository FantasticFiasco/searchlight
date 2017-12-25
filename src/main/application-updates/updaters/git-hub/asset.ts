/**
 * Class describing an asset in a GitHub release.
 */
export class Asset {
    /**
     * Initializes a new instance of the class.
     * @param name the asset name
     * @param url the asset URL
     */
    constructor(
        /**
         * Gets the name of the asset.
         */
        public readonly name: string,
        /**
         * Gets the URL of the asset.
         */
        public readonly url: string) {
        }
}

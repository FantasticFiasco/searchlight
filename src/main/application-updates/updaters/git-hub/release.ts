import { Asset } from './asset';

/**
 * Class describing a GitHub release.
 */
export class Release {
    /**
     * Initializes a new instance of the class.
     * @param assets the release assets
     */
    constructor(public readonly assets: Asset[]) {
    }
}

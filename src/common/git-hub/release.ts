import { Asset } from './asset';

/**
 * Class describing a GitHub release.
 */
export class Release {
    /**
     * The name.
     */
    public name: string;

    /**
     * The tag name.
     */
    // tslint:disable-next-line:variable-name
    public tag_name: string;

    /**
     * The assets.
     */
    public assets: Asset[];
}

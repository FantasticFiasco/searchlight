import { HttpClient } from '../../../net';
import { Asset } from './asset';
import { Release } from './release';

/**
 * Class capable of interacting with GitHub.
 */
export class GitHub {
    private readonly httpClient: HttpClient;
    private readonly latestReleaseUrl: string;

    /**
     * Initializes a new instance of the class.
     */
    constructor() {
        this.httpClient = new HttpClient();
        this.latestReleaseUrl = 'https://api.github.com/repos/fantasticfiasco/searchlight/releases/latest';
    }

    /**
     * Gets the latest release.
     */
    public async getLatestRelease(): Promise<Release> {
        const body = await this.httpClient.get(this.latestReleaseUrl);
        const document: any = JSON.parse(body);

        // Assets
        const assets: Asset[] = [];

        for (const asset of document.assets) {
            assets.push(new Asset(asset.name, asset.browser_download_url));
        }

        return new Release(assets);
    }
}

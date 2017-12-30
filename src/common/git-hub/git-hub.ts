import * as expect from '@fantasticfiasco/expect';

import { HttpClient } from '../net';
import { Release } from './release';

/**
 * Class capable of interacting with GitHub.
 */
export class GitHub {
    private readonly httpClient: HttpClient;
    private readonly taggedReleaseUrl: string;

    /**
     * Initializes a new instance of the class.
     */
    constructor() {
        this.httpClient = new HttpClient();
        this.taggedReleaseUrl = 'https://api.github.com/repos/fantasticfiasco/searchlight/releases/tags/';
    }

    /**
     * Gets release with specified tag.
     * @param tag the release tag
     */
    public async getRelease(tag: string): Promise<Release> {
        expect.toExist(tag);

        const body = await this.httpClient.get(this.taggedReleaseUrl + tag);
        const release: Release = JSON.parse(body);

        return release;
    }
}

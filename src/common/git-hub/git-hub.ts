import * as expect from '@fantasticfiasco/expect';
import { shell } from 'electron';

import { HttpClient } from '../net';
import { Release } from './release';

/**
 * Class capable of interacting with GitHub.
 */
export class GitHub {
    private readonly taggedReleaseUrl = 'https://api.github.com/repos/fantasticfiasco/searchlight/releases/tags/';

    /**
     * Gets release with specified tag.
     * @param tag the release tag
     */
    public async getRelease(tag: string): Promise<Release> {
        expect.toExist(tag);

        const httpClient = new HttpClient();
        const body = await httpClient.get(this.taggedReleaseUrl + tag);
        const release: Release = JSON.parse(body);

        return release;
    }

    /**
     * Opens web page where user can create a new issue.
     */
    public openIssueWebPage() {
        shell.openExternal('https://github.com/FantasticFiasco/searchlight/issues/new');
    }

    /**
     * Opens web page displaying the application license.
     */
    public openLicenseWebPage() {
        shell.openExternal('https://github.com/FantasticFiasco/searchlight/blob/master/LICENSE');
    }
}

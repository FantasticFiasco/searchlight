import { IHttpClient } from 'axis-discovery-ssdp';
import { net } from 'electron';

export class HttpClient implements IHttpClient {
    public get(url: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const request: Electron.ClientRequest = net.request(url);

            request.on('response', (response: Electron.IncomingMessage) => {
                if (response.statusCode !== 200) {
                    reject(new Error(`Unable to get ${url} due to ${response.statusCode} ${response.statusMessage}`));
                    return;
                }

                let body = '';

                response.on('data', (chunk: Buffer) => {
                    body += chunk.toString();
                });

                response.on('end', () => {
                    resolve(body);
                });

                response.on('error', (error: Error) => {
                    reject(error);
                });
            });

            request.on('login', (authInfo: any) => {
                reject(new Error('Proxy requiring authentication is not supported'));
            });

            request.on('error', (error: Error) => {
                reject(error);
            });

            request.end();
        });
    }
}

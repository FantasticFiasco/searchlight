import { net } from 'electron';

export function getRequest(url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        const request: Electron.ClientRequest = net.request(url);

        request.on('response', (response: Electron.IncomingMessage) => {
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

        request.end();
    });
}

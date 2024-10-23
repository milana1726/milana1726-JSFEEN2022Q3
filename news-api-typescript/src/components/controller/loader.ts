import { CallBack } from '../interfaces_types/callbackType';
import { ResponseParams, Status } from '../interfaces_types/dataInterfacesTypes';

class Loader {
    baseLink: string;
    options: { apiKey: string };
    constructor(baseLink: string, options: { apiKey: string }) {
        this.baseLink = baseLink;
        this.options = options;
    }

    public getResp<U>(
        params: ResponseParams,
        callback: CallBack<U> = () => {
            console.error('No callback for GET response');
        }
    ): void {
        this.load<U>('GET', callback, params);
    }

    private errorHandler(res: Response): Response {
        if (!res.ok) {
            if (res.status === Status.unauthorized || res.status === Status.notFound)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    private makeUrl(params: Partial<ResponseParams>): string {
        const urlOptions: { apiKey: string } = { ...this.options, ...params.options };
        let url = `${this.baseLink}${params.endpoint}?`;

        const obj: string[] = Object.keys(urlOptions);
        obj.forEach((key: string) => {
            url += `${key}=${urlOptions[key as keyof typeof urlOptions]}&`;
        });

        return url.slice(0, -1);
    }

    private load<T>(method: string, callback: CallBack<T>, params: ResponseParams): Promise<void | T> {
        return fetch(this.makeUrl(params), { method })
            .then(this.errorHandler)
            .then((res) => res.json() as Promise<T>)
            .then((data: T) => callback(data))
            .catch((err: string) => console.error(err));
    }
}

export default Loader;

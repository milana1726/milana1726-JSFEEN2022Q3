/* eslint-disable no-unused-vars */
export interface Articles {
    readonly urlToImage: string;
    readonly author: string;
    readonly source: Pick<ArticlesSource, 'id' | 'name'>;
    readonly publishedAt: string;
    readonly title: string;
    readonly description: string;
    readonly url: string;
}

export interface ArticlesSource {
    readonly category: string;
    readonly country: string;
    readonly description: string;
    readonly id: string;
    readonly language: string;
    readonly name: string;
    readonly url: string;
}

export interface ResponseParams {
    readonly endpoint: string;
    readonly options?: { sources: string };
}

export enum Status {
    ok = 'ok',
    unauthorized = 401,
    notFound = 404,
}

export type ArticlesData = {
    readonly articles: Articles[];
    readonly status: Status.ok;
    readonly totalResults: number;
};

export type SourcesData = {
    readonly sources: ArticlesSource[];
    readonly status: Status.ok;
};

import News from './news/news';
import Sources from './sources/sources';
import { Articles, ArticlesData, ArticlesSource, SourcesData } from '../interfaces_types/dataInterfacesTypes';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    public drawNews(data?: ArticlesData): void {
        const values: Articles[] = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    public drawSources(data?: SourcesData): void {
        const values: ArticlesSource[] = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

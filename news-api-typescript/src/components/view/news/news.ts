import './news.css';
import { Articles } from '../../interfaces_types/dataInterfacesTypes';

class News {
    draw(data: Articles[]): void {
        const news: Articles[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement | null = document.querySelector('#newsItemTemp');

        news.forEach((item: Articles, idx: number) => {
            const newsClone = <DocumentFragment>newsItemTemp?.content.cloneNode(true);

            if (idx % 2) {
                newsClone.querySelector('.news__item')?.classList.add('alt');
            }

            const metaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            if (metaPhoto) {
                metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }

            const metaAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
            if (metaAuthor) {
                metaAuthor.textContent = item.author || item.source.name;
            }

            const metaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
            if (metaDate) {
                metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');
            }

            const descriptionTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
            if (descriptionTitle) {
                descriptionTitle.textContent = item.title;
            }

            const descriptionSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
            if (descriptionSource) {
                descriptionSource.textContent = item.source.name;
            }

            const descriptionContent: HTMLElement | null = newsClone.querySelector('.news__description-content');
            if (descriptionContent) {
                descriptionContent.textContent = item.description;
            }

            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsBlock = <HTMLElement>document.querySelector('.news');
        newsBlock.innerHTML = '';
        newsBlock.appendChild(fragment);
    }
}

export default News;

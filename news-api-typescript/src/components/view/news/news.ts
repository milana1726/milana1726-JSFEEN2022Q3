import './news.css';
import { Articles } from '../../interfaces_types/dataInterfacesTypes';

class News {
    draw(data: Articles[]): void {
        const news: Articles[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment = document.createDocumentFragment() as DocumentFragment;
        const newsItemTemp = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item: Articles, idx: number) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const metaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
            const metaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
            const metaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
            const descriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
            const descriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
            const descriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;

            metaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            metaAuthor.textContent = item.author || item.source.name;
            metaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

            descriptionTitle.textContent = item.title;
            descriptionSource.textContent = item.source.name;
            descriptionContent.textContent = item.description;
            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });
        const newsBlock = document.querySelector('.news') as HTMLElement;
        newsBlock.innerHTML = '';
        newsBlock.appendChild(fragment);
    }
}

export default News;

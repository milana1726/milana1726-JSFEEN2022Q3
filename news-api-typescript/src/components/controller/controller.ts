import AppLoader from './appLoader';
import { CallBack } from '../interfaces_types/callbackType';

class AppController extends AppLoader {
    getSources<S>(callback: CallBack<S>): void {
        super.getResp<S>(
            {
                endpoint: 'sources',
            },
            callback
        );
    }

    getNews<N>(e: Event, callback: CallBack<N>): void {
        let target = e.target as HTMLElement;
        const newsContainer = e.currentTarget as HTMLElement;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id') as string;
                if (newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<N>(
                        {
                            endpoint: 'everything',
                            options: {
                                sources: sourceId,
                            },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentNode as HTMLElement;
        }
    }
}

export default AppController;

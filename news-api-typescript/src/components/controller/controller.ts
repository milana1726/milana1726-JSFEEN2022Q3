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
        let target = <HTMLElement>e.target;
        const newsContainer = <HTMLElement>e.currentTarget;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId: string | null = target.getAttribute('data-source-id');
                if (sourceId && newsContainer?.getAttribute('data-source') !== sourceId) {
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
            target = <HTMLElement>target.parentNode;
        }
    }
}

export default AppController;

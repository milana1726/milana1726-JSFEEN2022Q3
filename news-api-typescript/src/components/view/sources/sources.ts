import './sources.css';
import { ArticlesSource } from '../../interfaces_types/dataInterfacesTypes';

class Sources {
    draw(data: ArticlesSource[]): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement | null = document.querySelector('#sourceItemTemp');

        data.forEach((item: ArticlesSource) => {
            const sourceClone = <DocumentFragment>sourceItemTemp?.content.cloneNode(true);
            const itemName: HTMLElement | null = sourceClone.querySelector('.source__item-name');

            if (itemName) {
                itemName.textContent = item.name;
                sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);
            }

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;

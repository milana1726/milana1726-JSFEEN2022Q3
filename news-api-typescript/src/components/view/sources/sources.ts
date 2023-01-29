import './sources.css';
import { ArticlesSource } from '../../interfaces_types/dataInterfacesTypes';

class Sources {
    draw(data: ArticlesSource[]): void {
        const fragment = document.createDocumentFragment() as DocumentFragment;
        const sourceItemTemp = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item: ArticlesSource) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLElement;
            const itemName = sourceClone.querySelector('.source__item-name') as HTMLElement;

            itemName.textContent = item.name;
            sourceClone.querySelector('.source__item')?.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        document.querySelector('.sources')?.append(fragment);
    }
}

export default Sources;

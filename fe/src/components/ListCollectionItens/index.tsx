import React from 'react';
import CollectionItemComponent from './CollectionItem';
import { CollectionItem } from '../../models';

interface ListCollectionItensProps {
    collectionItens:CollectionItem[],
    action:(itemId:number) => void,
    itensSelected: number[]
}

const ListCollectionItensComponent:React.FC<ListCollectionItensProps> = (props) => {
    
    function wasClick(itemId:number) {
        const { itensSelected } = props;
        return itensSelected.includes(itemId);
    }

    function renderItens() {
        const { collectionItens, action } = props;
        return collectionItens.map( item => (
            <CollectionItemComponent 
                key={item.id} 
                item={item} 
                action={action}
                isSelected={wasClick(item.id)}
            />
        ))
    }

    return(
        <ul className="itens-container">
            {renderItens()}
        </ul>
    );
};

export default ListCollectionItensComponent;
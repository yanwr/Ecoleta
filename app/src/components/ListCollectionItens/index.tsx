import React from 'react';
import CollectionItem from '../../models/CollectionItem';
import { ScrollView } from 'react-native';
import CollectionItemComponent from './CollectionItem';

interface defaultProps {
    data: CollectionItem[];
    onSelect: (itemId:number) => void;
    itensSelected: number[];
}

const ListCollectionItensComponent:React.FC<defaultProps> = (props) => {

    function renderItens() {
        const { data, onSelect, itensSelected } = props;
        return data.map( item => (
            <CollectionItemComponent 
                key={String(item.id)}
                data={item}
                onSelect={onSelect}
                isSelected={itensSelected.includes(item.id)}
            />
        ));
    };

    return(
        <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16 }}
        >
           { renderItens() }
        </ScrollView>
    );
};

export default ListCollectionItensComponent;
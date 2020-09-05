import React, { LiHTMLAttributes } from 'react';
import { CollectionItem } from '../../models';

interface CollectionItemProps extends LiHTMLAttributes<HTMLLIElement> {
    item: CollectionItem,
    isSelected?:boolean,
    action: (itemId:number) => void;
};

const CollectionItemComponent: React.FC<CollectionItemProps> = (props) => {
    const { item, isSelected, action, ...defaultProps } = props;
    const classNameIs = isSelected ? 'selected' : '';
    return(
        <li 
            className={classNameIs}
            onClick={() => action(item.id)}
            {...defaultProps}
        >
            <img src={item.image_url} alt={`${item.name} item`} />
            <span>{item.name}</span>
        </li>
    );
};

export default CollectionItemComponent;
import React from 'react';
import { FontAwesome as Icon } from '@expo/vector-icons'

export default function IconComponent(props:any) {
    const { name, color, size } = props;
    return (
        <Icon name={name} color={color} size={size} />
    );
};
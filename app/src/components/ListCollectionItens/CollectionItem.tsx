import React from 'react';
import CollectionItem from '../../models/CollectionItem';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { SvgUri } from 'react-native-svg';

interface defaultProps {
    data: CollectionItem;
    onSelect: (itemId:number) => void;
    isSelected: boolean;
}

const CollectionItemComponent:React.FC<defaultProps> = (props) => {
    const { data, onSelect, isSelected } = props;
    return(
        <TouchableOpacity 
            style={[styles.item, isSelected ? styles.selectedItem : {}]} 
            onPress={() => onSelect(data.id)}
            activeOpacity={0.5}
        >
            <SvgUri width={42} height={42} uri={data.image_url} />
            <Text style={styles.itemTitle}>{data.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    item: {
      backgroundColor: '#fff',
      borderWidth: 2,
      borderColor: '#eee',
      height: 120,
      width: 120,
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 20,
      paddingBottom: 16,
      marginRight: 8,
      alignItems: 'center',
      justifyContent: 'space-between',
      textAlign: 'center',
    },
    selectedItem: {
      borderColor: '#34CB79',
      borderWidth: 2,
    },
    itemTitle: {
      fontFamily: 'Roboto_400Regular',
      textAlign: 'center',
      fontSize: 13,
    },
});

export default CollectionItemComponent
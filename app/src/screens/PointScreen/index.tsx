import React, { useState, useEffect } from 'react';
import Item from '../../models/CollectionItem';
import Point from '../../models/Point';
import { loadItens } from '../../services/ItemService';
import { loadPoints } from '../../services/PointService';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as GeoLocation from 'expo-location';
import { 
    View, StyleSheet, TouchableOpacity, 
    Text, SafeAreaView, Alert
} from 'react-native';
import IconComponent from '../../components/Icon';
import ListCollectionItem from '../../components/ListCollectionItens';
import MapComponent from '../../components/MapComponent';

interface StateNavigation {
  address_uf: string;
  address_city: string;
}

const PointScreen = (props:any) => {
    const navigation = useNavigation();
    const { address_uf, address_city } = useRoute().params as StateNavigation;
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
    const [itens, setItens] = useState<Item[]>([]);
    const [selectedItens, setSelectedItens] = useState<number[]>([]);
    const [points, setPoints] = useState<Point[]>([]);

    useEffect(() => {
      async function loadCurrentLocation() {
          const { status } = await GeoLocation.requestPermissionsAsync();
          if(status !== GeoLocation.PermissionStatus.GRANTED){
              Alert.alert('Oooopss ...', 'I need your permission to get your current location.');
              return;
          }
          const currentLocation = await GeoLocation.getCurrentPositionAsync();
          const { latitude, longitude } = currentLocation.coords;
          setInitialPosition([latitude, longitude]);
      };
      loadCurrentLocation();
    }, []);

    useEffect(() => {
      loadItens().then(res => setItens(res));
    }, []);

    useEffect(() => {
      loadPoints({ address_uf, address_city, itens: selectedItens })
        .then(res => setPoints(res));
    }, [address_uf, address_city, selectedItens]);

    function handleSelectItem(itemId:number) {
        const alreadySelected = selectedItens.findIndex(id => id === itemId);
        if(alreadySelected >= 0){
            const filteredItens = selectedItens.filter(id => id !== itemId);
            setSelectedItens(filteredItens);
        } else {
            setSelectedItens([ ...selectedItens, itemId ]);
        }
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack() }>
                    <IconComponent name={"arrow-left"} color={"#34cb79"} size={20} />
                </TouchableOpacity>
                <Text style={styles.title}>Welcome.</Text>
                <Text style={styles.description}>Find in map a collection point.</Text>
                <View style={styles.mapContainer}>
                   { initialPosition[0] !== 0 && (
                        <MapComponent 
                            initialPosition={initialPosition}
                            points={points}
                        />
                   )}
                </View>
            </View>
            <View style={styles.itemsContainer}>
                <ListCollectionItem 
                    data={itens} 
                    onSelect={(id:number) => handleSelectItem(id)}
                    itensSelected={selectedItens}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32,
    },
    title: {
      fontSize: 20,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 4,
      fontFamily: 'Roboto_400Regular',
    },
    mapContainer: {
      flex: 1,
      width: '100%',
      borderRadius: 10,
      overflow: 'hidden',
      marginTop: 16,
    },
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 8,
    },
});

export default PointScreen;
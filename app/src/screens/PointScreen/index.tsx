import React, { useState, useEffect } from 'react';
import Item from '../../models/CollectionItem';
import { loadItens } from '../../services/ItemService';
import { useNavigation } from '@react-navigation/native';
import * as GeoLocation from 'expo-location';
import { 
    View, StyleSheet, TouchableOpacity, 
    Text, Image, SafeAreaView, Alert
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import IconComponent from '../../components/Icon';
import ListCollectionItem from '../../components/ListCollectionItens';

const PointScreen = (props:any) => {
    const navigation = useNavigation();
    const [initialPosition, setInitialPosition] = useState<[number, number]>([0, 0])
    const [itens, setItens] = useState<Item[]>([]);
    const [selectedItens, setSelectedItens] = useState<number[]>([]);

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
        
    }, []);

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
                        <MapView 
                            style={styles.map}
                            initialRegion={{ 
                                latitude: initialPosition[0], 
                                longitude: initialPosition[1], 
                                longitudeDelta: 0.014, 
                                latitudeDelta: 0.014 
                            }}
                        >
                            <Marker 
                                style={styles.mapMarker}
                                coordinate={{ latitude: -27.4671178, longitude: -48.4487568 }}
                                onPress={() => navigation.navigate('detail-screen')}
                            >
                                <View style={styles.mapMarkerContainer}>
                                    <Image 
                                        style={styles.mapMarkerImage}
                                        source={{ uri: "https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=40" }}
                                    />
                                    <Text style={styles.mapMarkerTitle}>Shop Computer</Text>
                                </View>
                            </Marker>
                        </MapView>
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
    map: {
      width: '100%',
      height: '100%',
    },
    mapMarker: {
      width: 90,
      height: 80, 
    },
    mapMarkerContainer: {
      width: 90,
      height: 70,
      backgroundColor: '#34CB79',
      flexDirection: 'column',
      borderRadius: 8,
      overflow: 'hidden',
      alignItems: 'center'
    },
    mapMarkerImage: {
      width: 90,
      height: 45,
      resizeMode: 'cover',
    },
    mapMarkerTitle: {
      flex: 1,
      fontFamily: 'Roboto_400Regular',
      color: '#FFF',
      fontSize: 13,
      lineHeight: 23,
    },
    itemsContainer: {
      flexDirection: 'row',
      marginTop: 16,
      marginBottom: 8,
    },
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

export default PointScreen;
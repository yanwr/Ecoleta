import React from 'react';
import Point from '../../models/Point';
import { useNavigation } from '@react-navigation/native';
import { Image, View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface defaultProps {
    initialPosition: [number, number];
    points: Point[];
}

const MapComponent:React.FC<defaultProps> = (props) => {
    const navigation = useNavigation();
    const { initialPosition, points } = props;

    function handleNavigateToDetails(id:number) {
        navigation.navigate('detail-screen', { id });
    };

    function renderMarker() {
        return points.map( point => {
            const coordinate = { 
                latitude: point.address_latitude,
                longitude: point.address_longitude 
            };
            return(
                <Marker 
                    key={String(point.id)}
                    style={styles.mapMarker}
                    coordinate={coordinate}
                    onPress={() => handleNavigateToDetails(point.id)}
                >
                    <View style={styles.mapMarkerContainer}>
                        <Image 
                            style={styles.mapMarkerImage}
                            source={{ uri: point.image }}
                        />
                        <Text style={styles.mapMarkerTitle}>{point.name}</Text>
                    </View>
                </Marker>
            )
        });
    }

    return(
        <MapView 
            style={styles.map}
            initialRegion={{ 
                latitude: initialPosition[0], 
                longitude: initialPosition[1], 
                longitudeDelta: 0.014, 
                latitudeDelta: 0.014 
            }}
        >
            { renderMarker() }
        </MapView>
    );
};

const styles = StyleSheet.create({
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
});

export default MapComponent;
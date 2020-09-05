import React, { useState, useEffect } from 'react';
import Point from '../../models/Point';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';
import { loadOnePoint } from '../../services/PointService';
import { View, StyleSheet, TouchableOpacity, Image, Text,
  SafeAreaView, Linking  } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import IconComponent from '../../components/Icon';

interface StateNavigation {
  id:number;
}

const DetailScreen = () => {
  const navigation = useNavigation();
  const { id } = useRoute().params as StateNavigation;
  const [point, setPoint] = useState<Point>({} as Point);

  useEffect(() => {
    loadOnePoint(id).then( res => 
      setPoint(res)
    );
  }, []);

  function handleComposeWpp() {
    Linking.openURL(`whatsapp://send?phone=${point.user.whatsapp}`);
  };

  function handleComposeEmail() {
    MailComposer.composeAsync({
      recipients: [point.email, point.user.email],
      subject: 'I\'m interested in collecting',
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        { !point.itens 
          ? <Text style={styles.pointName}>Please, hold on ...</Text>
          : <>
            <TouchableOpacity onPress={() => navigation.goBack() }>
              <IconComponent name={"arrow-left"} color={"#34cb79"} size={20} />
            </TouchableOpacity>
            <Image style={styles.pointImage} source={{ uri: point.image}}/>
            <Text style={styles.pointName}>{point.name}</Text>
            <Text style={styles.pointItems}>{point.itens.map(item => (item.name)).join(', ')}</Text>
            <View style={styles.address}>
              <Text style={styles.addressTitle}>{point.address_city}, {point.address_number}</Text>
              <Text style={styles.addressContent}>{point.address_uf}</Text>
            </View> 
          </>
        }
      </View>
      <View style={styles.footer}>
        <RectButton style={styles.button} onPress={handleComposeWpp} >
          <IconComponent name={"whatsapp"} color={"#FFF"} size={20} />
          <Text style={styles.buttonText}>Whatsapp</Text>
        </RectButton>
        <RectButton style={styles.button} onPress={handleComposeEmail}>
          <IconComponent name={"envelope"} color={"#FFF"} size={20} />
          <Text style={styles.buttonText}>E-mail</Text>
        </RectButton>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },
    pointImage: {
      width: '100%',
      height: 120,
      resizeMode: 'cover',
      borderRadius: 10,
      marginTop: 32,
    },
    pointName: {
      color: '#322153',
      fontSize: 28,
      fontFamily: 'Ubuntu_700Bold',
      marginTop: 24,
    },
    pointItems: {
      fontFamily: 'Roboto_400Regular',
      fontSize: 16,
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
    address: {
      marginTop: 32,
    },
    addressTitle: {
      color: '#322153',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    },
    addressContent: {
      fontFamily: 'Roboto_400Regular',
      lineHeight: 24,
      marginTop: 8,
      color: '#6C6C80'
    },
    footer: {
      borderTopWidth: StyleSheet.hairlineWidth,
      borderColor: '#999',
      paddingVertical: 20,
      paddingHorizontal: 32,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    button: {
      width: '48%',
      backgroundColor: '#34CB79',
      borderRadius: 10,
      height: 50,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    },
    buttonText: {
      marginLeft: 8,
      color: '#FFF',
      fontSize: 16,
      fontFamily: 'Roboto_500Medium',
    },
});

export default DetailScreen;
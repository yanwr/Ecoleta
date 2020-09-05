import React, { useState, useEffect } from 'react';
import { IBGE_FORMATED } from '../../models/IbgeDTO';
import { loadCitysByUF, loadUFs } from '../../apis/api-IBGE';
import Logo from '../../assets/logo.png';
import BgLogo from '../../assets/home-background.png';
import { useNavigation } from '@react-navigation/native';
import { View, ImageBackground, Image, StyleSheet, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import IconComponent from '../../components/Icon';
import PickerComponent from '../../components/PickerSelect';

const HomeScreen = (props:any) => {
    const navigation = useNavigation();
    const [ufs, setUfs] = useState<IBGE_FORMATED[] | any>([]);
    const [cities, setCities] = useState<IBGE_FORMATED[] | any>([]);
    const [ufSelected, setUfSelected] = useState('');
    const [citySelected, setCitySelected] = useState('');

    useEffect(() => {
        loadUFs().then( 
            res => { setUfs(res) },
            e => { console.log('Erro to load UFS', e) }
        );
    }, []);

    useEffect(() => {
        if(ufSelected === '') { return };
        loadCitysByUF(ufSelected).then( 
            res => { setCities(res)},
            e => { console.log('Error to load cities', e) }    
        );
    }, [ufSelected]);

    function handleNavigateToPoints() {
        console.log({ address_uf: ufSelected, address_city: citySelected })
        navigation.navigate('point-screen', { address_uf: ufSelected, address_city: citySelected });
    };

    return(
        <ImageBackground 
            source={BgLogo} 
            style={styles.container} 
            imageStyle={{ width: 274, height: 368 }}
        >
            <View style={styles.main}>
                <Image source={Logo} />
                <Text style={styles.title}>Your waste collection marketplace</Text>
                <Text style={styles.description}>We help people find collection points efficiently.</Text>
            </View>
            <View style={styles.footer}>
                <PickerComponent 
                    datas={ufs}
                    label={"Select your UF ..."}
                    selectedValue={ufSelected}
                    onChangeValue={(value) => setUfSelected(value)}
                />
                <PickerComponent 
                    datas={cities}
                    label={"Select your city ..."}
                    selectedValue={citySelected}
                    onChangeValue={(value) => setCitySelected(value)}
                />
                <RectButton 
                    style={styles.button}
                    onPress={handleNavigateToPoints}
                >
                    <View style={styles.buttonIcon}>
                        <IconComponent name={"arrow-right"} color={"#FFF"} size={24} />
                    </View>
                    <Text style={styles.buttonText}>
                        Sing in
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
    },
    main: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        color: '#322153',
        fontSize: 32,
        fontFamily: 'Ubuntu_700Bold',
        maxWidth: 260,
        marginTop: 64,
    },
    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        fontFamily: 'Roboto_400Regular',
        maxWidth: 260,
        lineHeight: 24,
    },
    footer: {},
    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },
    buttonIcon: {
        height: 60,
        width: 60,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    }
});

export default HomeScreen;
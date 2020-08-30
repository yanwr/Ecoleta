import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens//HomeScreen';
import PointScreen from '../screens//PointScreen';
import DetailScreen from '../screens//DetailScreen';

const AppStack = createStackNavigator();

const Routes = () => {
    const defaultOptions = { 
        cardStyle: { backgroundColor: '#f0f0f5' }
    };
    return (
        <NavigationContainer>
            <AppStack.Navigator headerMode={"none"} screenOptions={defaultOptions}>
                <AppStack.Screen name='home-screen' component={HomeScreen} />
                <AppStack.Screen name='point-screen' component={PointScreen} />
                <AppStack.Screen name='detail-screen' component={DetailScreen} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
};

export default Routes;
import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import MainScreen from '../Screens/MainScreen';
import MapScreen from '../Screens/MapScreen';


const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator >
        <Stack.Screen name="Main" component={MainScreen} headerMode={{headerShown:false}} />
        <Stack.Screen name='Map' component={MapScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;
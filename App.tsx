// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RealTimeFlights from './screens/RealTimeFlights';
import FlightsScreen from './screens/FlightsScreen';
import AuthScreen from './screens/AuthScreen';
import HotelsScreen from './screens/HotelsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="HomeScreen">
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="HotelsScreen" 
        component={HotelsScreen} 
        />

        <Stack.Screen
          name="FlightsScreen"
          component={FlightsScreen}
          options={{ title: 'Statut des vols' }}
        />
        <Stack.Screen
          name="RealTimeFlights"
          component={RealTimeFlights}
          options={{ title: 'Vols en direct' }}
        />
        <Stack.Screen name="AuthScreen" component={AuthScreen} /> 

      </Stack.Navigator>
    </NavigationContainer>
  );
}

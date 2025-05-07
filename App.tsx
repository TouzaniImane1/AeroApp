// App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import RealTimeFlights from './screens/RealTimeFlights';
import FlightsScreen from './screens/FlightsScreen';
import AuthScreen from './screens/AuthScreen';
import HotelsScreen from './screens/HotelsScreen';
import RestaurantsScreen from './screens/RestaurantsScreen';
import ShoppingScreen from './screens/ShoppingScreen';

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
        options={{ title: "🏨 Hôtels près de l'Aéroport" }}
        />
        <Stack.Screen 
        name="ShoppingScreen" 
        component={ShoppingScreen} 
        options={{ title: "🛍️ Boutiques de l'Aéroport Fès–Saïss" }}

        />
        <Stack.Screen 
        name="RestaurantsScreen" 
        component={RestaurantsScreen} 
        options={{ title: '🍽️ Restaurants disponibles dans l’aéroport' }}
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

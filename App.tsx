import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthGoogleScreen from './screens/AuthGoogleScreen';
import HomeScreen from './screens/HomeScreen';
import RealTimeFlights from './screens/RealTimeFlights';
import FlightsScreen from './screens/FlightsScreen';
import AuthScreen from './screens/AuthScreen';
import HotelsScreen from './screens/HotelsScreen';
import RestaurantsScreen from './screens/RestaurantsScreen';
import ShoppingScreen from './screens/ShoppingScreen';
import TransportScreen from './screens/TransportScreen';
import AuthFormScreen from './screens/AuthFormScreen';
import LoginScreen from './screens/LoginScreen';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { RootStackParamList } from './src/types/navigation';
import ParkingScreen from './screens/ParkingScreen';
import ProfileScreen from './screens/ProfileScreen';
import MesVolsScreen from './screens/MesVolsScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        // ✅ Authenticated user routes
        <>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="HotelsScreen" component={HotelsScreen} />
          <Stack.Screen name="TransportScreen" component={TransportScreen} />
          <Stack.Screen name="ShoppingScreen" component={ShoppingScreen} />
          <Stack.Screen name="RestaurantsScreen" component={RestaurantsScreen} />
          <Stack.Screen name="FlightsScreen" component={FlightsScreen} />
          <Stack.Screen name="RealTimeFlights" component={RealTimeFlights} />
          <Stack.Screen name="ParkingScreen" component={ParkingScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="MesVols" component={MesVolsScreen} />

        </>
      ) : (
        // ✅ Unauthenticated user routes
        <>
          <Stack.Screen name="AuthScreen" component={AuthScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="AuthFormScreen" component={AuthFormScreen} />
          <Stack.Screen name="AuthGoogleScreen" component={AuthGoogleScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

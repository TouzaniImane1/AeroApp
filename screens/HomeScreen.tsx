import React, { useRef } from 'react';
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as Location from 'expo-location';

import HeaderTop from '../components/HeaderTop';
import ImageHeader from '../components/ImageHeader';
import SearchAndQuickAccess from '../components/SearchAndQuickAccess';
import FlightSummary from '../components/FlightSummary';
import AirportServices from '../components/AirportServices';
import { useAuth } from '../contexts/AuthContext';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();
  const { user } = useAuth();
  const scrollViewRef = useRef<ScrollView>(null);
  const planSectionRef = useRef<View>(null);
  const planY = useRef(0);

  const openGoogleMapsWithCurrentLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission de localisation refusée');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    const latitude = location.coords.latitude;
    const longitude = location.coords.longitude;

    const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=Aéroport+Fès-Saïss&travelmode=driving`;
    Linking.openURL(url);
  };

  return (
    <ScrollView
      ref={scrollViewRef}
      style={{ flex: 1, backgroundColor: '#f7f8fa' }}
    >
      <HeaderTop />
      <ImageHeader />

      <SearchAndQuickAccess
        onScrollToPlan={() => {
          scrollViewRef.current?.scrollTo({ y: planY.current, animated: true });
        }}
      />

      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 16, color: '#111', marginVertical: 10 }}>
          Statut des Vols
        </Text>
        <FlightSummary />
      </View>

      <TouchableOpacity
        style={{
          backgroundColor: '#007bff',
          paddingVertical: 14,
          marginHorizontal: 16,
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 20,
        }}
        onPress={() => navigation.navigate('RealTimeFlights')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
          VOIR LES VOLS EN DIRECT
        </Text>
      </TouchableOpacity>

      {/* -------- PLAN AÉROPORT -------- */}
      <View
        ref={planSectionRef}
        style={{ marginTop: 32, paddingHorizontal: 16 }}
        onLayout={event => {
          planY.current = event.nativeEvent.layout.y;
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8
          }}
        >
          <Text style={{ fontSize: 16, color: '#111' }}>Plan de l’aéroport</Text>
          <TouchableOpacity onPress={openGoogleMapsWithCurrentLocation}>
            <Text style={{ color: '#2563EB', fontSize: 14 }}>Explorer</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.1,
            shadowRadius: 8,
            elevation: 6
          }}
        >
          <Image
            source={require('../assets/plan_fes_saiss.jpg')}
            style={{ width: '100%', height: 180 }}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              bottom: 12,
              left: 16,
              right: 16
            }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: '#ffffffee',
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#2563EB'
              }}
              onPress={openGoogleMapsWithCurrentLocation}
            >
              <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>
                Ouvrir le plan interactif
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* -------- SITE OFFICIEL -------- */}
      <View style={{ marginTop: 30, paddingHorizontal: 16 }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8
          }}
        >
          <Text style={{ fontSize: 16, color: '#111' }}>Site Officiel</Text>
        </View>

        <View
          style={{
            backgroundColor: '#2563EB',
            borderRadius: 16,
            padding: 16,
            marginBottom: 20
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 12
            }}
          >
            <View
              style={{
                backgroundColor: '#3B82F6',
                borderRadius: 100,
                padding: 10,
                marginRight: 12
              }}
            >
              <Image
                source={require('../assets/airplane-icon.png')}
                style={{ width: 24, height: 24, tintColor: '#fff' }}
              />
            </View>
            <View>
              <Text style={{ color: '#fff', fontSize: 16 }}>
                Réservation Officielle
              </Text>
              <Text style={{ color: '#e0eaff', fontSize: 13 }}>
                Office National Des Aéroports
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              paddingVertical: 10,
              alignItems: 'center'
            }}
            onPress={() =>
              Linking.openURL(
                'https://www.onda.ma/Nos-A%C3%A9roports/A%C3%A9roport-F%C3%A8s-Sa%C3%AFss?fullbrowser'
              )
            }
          >
            <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>
              Accéder à la plateforme ONDA
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

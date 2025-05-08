// screens/HomeScreen.tsx

import React from 'react';
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

import HeaderTop from '../components/HeaderTop';
import ImageHeader from '../components/ImageHeader';
import SearchAndQuickAccess from '../components/SearchAndQuickAccess';
import FlightSummary from '../components/FlightSummary';
import AirportServices from '../components/AirportServices';

type NavigationProp = NativeStackNavigationProp<any>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f7f8fa' }}>
      <HeaderTop />
      <ImageHeader />
      <SearchAndQuickAccess />

      {/* Statut des Vols */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 16, color: '#111', marginVertical: 10 }}>
          Statut des Vols
        </Text>
        <FlightSummary />
      </View>

      {/* Bouton Vols en direct */}
      <TouchableOpacity
        style={{
          backgroundColor: '#007bff',
          paddingVertical: 14,
          marginHorizontal: 16,
          borderRadius: 12,
          alignItems: 'center',
          marginTop: 20,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 4 },
          shadowRadius: 6,
          elevation: 4,
        }}
        onPress={() => navigation.navigate('RealTimeFlights')}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
          VOIR LES VOLS EN DIRECT
        </Text>
      </TouchableOpacity>

      {/* Plan de l’aéroport */}
      <View style={{ marginTop: 32, paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontSize: 16, color: '#111' }}>Plan de l’aéroport</Text>
          <TouchableOpacity onPress={() => navigation.navigate('MapScreen')}>
            <Text style={{ color: '#2563EB', fontSize: 14 }}>Explorer</Text>
          </TouchableOpacity>
        </View>

        <View style={{
          backgroundColor: '#fff',
          borderRadius: 16,
          overflow: 'hidden',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 6
        }}>
          <Image
            source={require('../assets/plan_fes_saiss.png')}
            style={{ width: '100%', height: 180 }}
            resizeMode="cover"
          />
          <View style={{ position: 'absolute', bottom: 12, left: 16, right: 16 }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#ffffffee',
                paddingVertical: 10,
                borderRadius: 10,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: '#2563EB'
              }}
              onPress={() => navigation.navigate('MapScreen')}
            >
              <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>
                Ouvrir le plan interactif
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Services aéroportuaires */}
      <View style={{ marginTop: 30, paddingHorizontal: 16 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <Text style={{ fontSize: 16, color: '#111' }}>Services aéroportuaires</Text>
          <TouchableOpacity>
            <Text style={{ color: '#2563EB', fontSize: 14 }}>Tous les services</Text>
          </TouchableOpacity>
        </View>

        {/* Bloc ONDA stylisé */}
        <View style={{
          backgroundColor: '#2563EB',
          borderRadius: 16,
          padding: 16,
          marginBottom: 20
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <View style={{
              backgroundColor: '#3B82F6',
              borderRadius: 100,
              padding: 10,
              marginRight: 12
            }}>
              <Image
                source={require('../assets/airplane-icon.png')}
                style={{ width: 24, height: 24, tintColor: '#fff' }}
              />
            </View>
            <View>
              <Text style={{ color: '#fff', fontSize: 16 }}>Réservation Officielle</Text>
              <Text style={{ color: '#e0eaff', fontSize: 13 }}>Office National Des Aéroports</Text>
            </View>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: '#fff',
              borderRadius: 10,
              paddingVertical: 10,
              alignItems: 'center'
            }}
            onPress={() => Linking.openURL('https://www.onda.ma')}
          >
            <Text style={{ color: '#2563EB', fontWeight: 'bold' }}>
              Accéder à la plateforme ONDA
            </Text>
          </TouchableOpacity>
        </View>

        {/* Cartes Hôtels & Transport premium */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {/* Hôtels */}
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 16,
            width: '48%',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 2
          }}>
            <View style={{
              backgroundColor: '#FEF3C7',
              borderRadius: 50,
              padding: 12,
              marginBottom: 8
            }}>
              <Image
                source={require('../assets/hotel.png')}
                style={{ width: 24, height: 24, tintColor: '#D97706' }}
              />
            </View>
            <Text style={{ fontSize: 14, marginBottom: 10 }}>Hôtels à proximité</Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#e5e7eb',
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 14
              }}
              onPress={() => navigation.navigate('HotelsScreen')}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Réserver</Text>
            </TouchableOpacity>
          </View>

          {/* Transport */}
          <View style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            padding: 16,
            width: '48%',
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.06,
            shadowOffset: { width: 0, height: 2 },
            shadowRadius: 4,
            elevation: 2
          }}>
            <View style={{
              backgroundColor: '#ffff',
              borderRadius: 50,
              padding: 12,
              marginBottom: 8
            }}>
              <Image
                source={require('../assets/train-icon.jpg')}
                style={{ width: 34, height: 24}}
              />
            </View>
            <Text style={{ fontSize: 14, marginBottom: 10 }}>Taxi Aéroport</Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#e5e7eb',
                borderRadius: 8,
                paddingVertical: 6,
                paddingHorizontal: 14
              }}
              onPress={() => navigation.navigate('TransportScreen')}
            >
              <Text style={{ fontWeight: 'bold', fontSize: 14 }}>Réserver</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

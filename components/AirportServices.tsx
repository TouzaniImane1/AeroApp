// components/AirportServices.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const services = [
  {
    icon: require('../assets/parking-icon.jpg'),
    color: '#E0F2FE',
    title: 'Parking Intelligent',
    subtitle: 'Réservez votre place et payez en ligne',
  },
  {
    icon: require('../assets/shopping-icon.png'),
    color: '#F0F9FF',
    title: 'Shopping & Restauration',
    subtitle: 'Découvrez nos boutiques et restaurants',
  },
  {
    icon: require('../assets/wifi-icon.jpg'),
    color: '#F0FDFA',
    title: 'Wi-Fi & eSIM',
    subtitle: 'Restez connecté pendant votre voyage',
  },
  {
    icon: require('../assets/luggage-icon.png'),
    color: '#F3F4F6',
    title: 'Services Bagages',
    subtitle: 'Suivi en temps réel de vos bagages',
  },
];

export default function AirportServices() {
  return (
    <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
      <Text style={{ fontSize: 16, color: '#111', marginBottom: 12 }}>
        Services aéroportuaires
      </Text>
      {services.map((item, index) => (
        <View
          key={index}
          style={{
            backgroundColor: '#fff',
            borderRadius: 16,
            marginBottom: 12,
            overflow: 'hidden',
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 4,
            elevation: 2,
          }}
        >
          <Image source={item.icon} style={{ width: '100%', height: 120 }} resizeMode="cover" />
          <View style={{ padding: 12, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: item.color, padding: 8, borderRadius: 50, marginRight: 10 }}>
              <Image source={item.icon} style={{ width: 18, height: 18 }} />
            </View>
            <View>
              <Text style={{ fontWeight: '600' }}>{item.title}</Text>
              <Text style={{ fontSize: 12, color: '#555' }}>{item.subtitle}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

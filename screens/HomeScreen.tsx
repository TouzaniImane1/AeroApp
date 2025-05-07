// screens/HomeScreen.tsx

import FlightSummary from '../components/FlightSummary'; // ⬅️ important
import { ScrollView, View,Modal, Text, TouchableOpacity } from 'react-native';
import HeaderTop from '../components/HeaderTop';
import ImageHeader from '../components/ImageHeader';
import SearchAndQuickAccess from '../components/SearchAndQuickAccess';
//import FlightStatus from '../components/FlightStatus';//
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';

// Si tu n’utilises pas RootStackParamList, tu peux aussi remplacer par : any
type NavigationProp = NativeStackNavigationProp<any>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [transportModalVisible, setTransportModalVisible] = useState(false);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f7f8fa' }}>
      <HeaderTop />
      <ImageHeader />
      <SearchAndQuickAccess />
       
      {/* Section : Statut des Vols */}
      <View style={{ paddingHorizontal: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
          Statut des Vols
        </Text>
        <FlightSummary />
      </View>

      {/* Bouton : Navigation vers la page des vols en direct */}
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

    </ScrollView>
  );
}

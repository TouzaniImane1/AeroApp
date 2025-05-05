// screens/HomeScreen.tsx

import React from 'react';
import FlightSummary from '../components/FlightSummary'; // ⬅️ important
import { ScrollView, View, Text, Button } from 'react-native';
import HeaderTop from '../components/HeaderTop';
import ImageHeader from '../components/ImageHeader';
import SearchAndQuickAccess from '../components/SearchAndQuickAccess';
//import FlightStatus from '../components/FlightStatus';//
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// Si tu n’utilises pas RootStackParamList, tu peux aussi remplacer par : any
type NavigationProp = NativeStackNavigationProp<any>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

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
      <View style={{ paddingHorizontal: 16, marginTop: 10 }}>
        <Button
          title="Voir les vols en direct"
          onPress={() => navigation.navigate('RealTimeFlights')}
          color="#007bff"
        />
      </View>
    </ScrollView>
  );
}

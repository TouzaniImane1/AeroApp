// screens/HomeScreen.tsx

import React from 'react';
import { ScrollView, Button } from 'react-native';
import HeaderTop from '../components/HeaderTop';
import ImageHeader from '../components/ImageHeader';
import SearchAndQuickAccess from '../components/SearchAndQuickAccess';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'HomeScreen'>;

export default function HomeScreen() {
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f7f8fa' }}>
      <HeaderTop />
      <ImageHeader />
      <SearchAndQuickAccess />
      <Button title="Voir les vols en direct" onPress={() => navigation.navigate('RealTimeFlights')} />
    </ScrollView>
  );
}

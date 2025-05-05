import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // 👈
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AirplaneIcon from '../assets/airplane-icon.png';
import TaxiIcon from '../assets/Taxi-icon.png';
import ParkingIcon from '../assets/parking-icon.jpg';
import ShoppingIcon from '../assets/shopping-icon.png';
import RestaurantIcon from '../assets/restaurant-icon.png';
import LuggageIcon from '../assets/luggage-icon.png';
import MapIcon from '../assets/map-icon.png';
import InfoIcon from '../assets/info-icon.png';
import SearchIcon from '../assets/search-icon.png';

const quickItems = [
  { label: 'Mes Vols', icon: AirplaneIcon },
  { label: 'Parking', icon: ParkingIcon },
  { label: 'Transport', icon: TaxiIcon },
  { label: 'Shopping', icon: ShoppingIcon },
  { label: 'Restaurants', icon: RestaurantIcon },
  { label: 'Bagages', icon: LuggageIcon },
  { label: 'Plan', icon: MapIcon },
  { label: 'Infos', icon: InfoIcon },
];

export default function SearchAndQuickAccess() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleSearch = () => {
    if (search.trim() !== '') {
      navigation.navigate('RealTimeFlights', { query: search.trim() }); // 👈 passe le texte saisi
    }
  };

  return (
    <View style={styles.container}>
      {/* Zone recherche */}
      <View style={styles.searchCard}>
        <Text style={styles.searchTitle}>Rechercher un vol</Text>
        <Text style={styles.searchSubtitle}>Trouvez votre vol en quelques secondes</Text>

        <View style={styles.searchBar}>
          <Image source={SearchIcon} style={styles.searchIcon} />
          <TextInput
            placeholder="Numéro de vol ou destination"
            placeholderTextColor="#777"
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.searchButtonText}>Rechercher</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Accès rapide */}
      <Text style={styles.sectionTitle}>Accès rapide</Text>

      <View style={styles.grid}>
        {quickItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.quickItem,
              activeIndex === index && styles.activeCard,
            ]}
            onPressIn={() => setActiveIndex(index)}
            onPressOut={() => setActiveIndex(null)}
          >
            <Image source={item.icon} style={styles.iconImage} />
            <Text
              style={[
                styles.iconLabel,
                activeIndex === index && styles.activeLabel,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
// Ajoute ceci à la fin de SearchAndQuickAccess.tsx

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#F9FBFD',
    flex: 1,
  },
  searchCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 4,
    marginBottom: 20,
  },
  searchTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginBottom: 6,
  },
  searchSubtitle: {
    fontSize: 12,
    color: '#555',
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    paddingRight: 8,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    marginRight: 6,
    resizeMode: 'contain',
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#333',
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 14,
    color: '#333',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickItem: {
    width: '22%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    elevation: 3,
  },
  activeCard: {
    shadowOpacity: 0.15,
    shadowRadius: 6,
    backgroundColor: '#EDF4FC',
  },
  iconImage: {
    width: 38,
    height: 38,
    marginBottom: 6,
    resizeMode: 'contain',
  },
  iconLabel: {
    fontSize: 12,
    color: '#333',
    fontWeight: '500',
  },
  activeLabel: {
    color: '#4A90E2',
    fontWeight: '700',
  },
});

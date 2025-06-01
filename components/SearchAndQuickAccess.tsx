import React, { useState } from 'react'; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  ScrollView,
  Linking
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import AirplaneIcon from '../assets/airplane-icon.png';
import TaxiIcon from '../assets/train-icon.png';
import ParkingIcon from '../assets/parking-icon.jpg';
import ShoppingIcon from '../assets/shopping-icon.png';
import RestaurantIcon from '../assets/restaurant-icon.png';
import HotelIcon from '../assets/hotel.png';
import MapIcon from '../assets/map-icon.png';
import InfoIcon from '../assets/info-icon.png';
import SearchIcon from '../assets/search-icon.png';

const quickItems = [
  { label: 'Mes Vols', icon: AirplaneIcon },
  { label: 'Parking', icon: ParkingIcon },
  { label: 'Transport', icon: TaxiIcon },
  { label: 'Shopping', icon: ShoppingIcon },
  { label: 'Restaurants', icon: RestaurantIcon },
  { label: 'Hôtels', icon: HotelIcon },
  { label: 'Plan', icon: MapIcon },
  { label: 'Infos', icon: InfoIcon },
];

export default function SearchAndQuickAccess() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const [transportModalVisible, setTransportModalVisible] = useState(false);
  const [parkingModalVisible, setParkingModalVisible] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const handleSearch = () => {
    if (search.trim() !== '') {
      navigation.navigate('RealTimeFlights', { query: search.trim() });
    }
  };

  const handleQuickAccess = (label: string) => {
    switch (label) {
      case 'Mes Vols':
        navigation.navigate('MesVols');
        break;
      case 'Hôtels':
        navigation.navigate('HotelsScreen');
        break;
      case 'Restaurants':
        navigation.navigate('RestaurantsScreen');
        break;
      case 'Shopping':
        navigation.navigate('ShoppingScreen');
        break;
      case 'Transport':
        setTransportModalVisible(true);
        break;
      case 'Parking':
        setParkingModalVisible(true);
        break;
      default:
        console.log('Accès rapide cliqué :', label);
    }
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.sectionTitle}>Accès rapide</Text>

      <View style={styles.grid}>
        {quickItems.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.quickItem, activeIndex === index && styles.activeCard]}
            onPressIn={() => setActiveIndex(index)}
            onPressOut={() => setActiveIndex(null)}
            onPress={() => handleQuickAccess(item.label)}
          >
            <Image source={item.icon} style={styles.iconImage} />
            <Text style={[styles.iconLabel, activeIndex === index && styles.activeLabel]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal Transport */}
      <Modal
        visible={transportModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setTransportModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🚕 Tarifs des Taxis depuis l’Aéroport</Text>
            <ScrollView style={{ maxHeight: 300 }}>
               {[
                ["Volubilis - My. Idriss - Meknès", "800 DH"],
                ["Moyen Atlas", "800 DH"],
                ["Fès", "120 DH"],
                ["Volubilis - My. Idriss", "500 DH"],
                ["Meknès", "400 DH"],
                ["Bhalil - Sefrou", "400 DH"],
                ["My Yacoub", "300 DH"],
                ["Sidi Harazem", "300 DH"],
                ["Rabat", "1300 DH"],
                ["Casablanca", "1200 DH"],
                ["Aéroport Med V", "1200 DH"],
                ["Tanger", "1200 DH"],
                ["Aéroport Tanger", "800 DH"],
                ["Chaouen", "1200 DH"],
                ["Tétouan", "1200 DH"],
                ["Al Hoceima", "1300 DH"],
                ["Oujda", "1300 DH"],
                ["Nador", "1300 DH"],
                ["Taza", "500 DH"],
                ["Marrakech", "2000 DH"],
                ["Ifrane", "300 DH"]
              ].map(([dest, price], i) => (
                <View key={i} style={styles.tarifRow}>
                  <Text style={styles.tarifDestination}>{dest}</Text>
                  <Text style={styles.tarifPrice}>{price}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.separator} />

            <Text style={styles.sectionTitle}>☎️ Numéros utiles</Text>
            <TouchableOpacity style={styles.phoneButton} onPress={() => Linking.openURL('tel:05 35 62 26 59')}>
              <Text style={styles.phoneButtonText}> Wilaya de Fes-Meknes : 05 35 62 26 59</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.phoneButton} onPress={() => Linking.openURL('tel:0535624808')}>
              <Text style={styles.phoneButtonText}> Aéroport Fès–Saïss : 05 35 62 48 08</Text>
            </TouchableOpacity>
            <Text style={styles.sectionTitle}>🚆 Autre Options</Text>

            <TouchableOpacity
              style={styles.phoneButton}
              onPress={() => navigation.navigate('TransportScreen')}>
              <Text style={styles.phoneButtonText}>🚍 Autres moyens de transport</Text>
            </TouchableOpacity>

            

            <TouchableOpacity onPress={() => setTransportModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

       {/* Modal Parking */}
      <Modal
        visible={parkingModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setParkingModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>🚗 Tarifs de stationnement – Aéroport Fès–Saïss</Text>
            <View style={styles.tableHeader}>
              <Text style={[styles.cell, styles.header]}>Durée</Text>
              <Text style={[styles.cell, styles.header]}>Plein air</Text>
              <Text style={[styles.cell, styles.header]}>Autocars</Text>
              <Text style={[styles.cell, styles.header]}>Couvertes</Text>
            </View>
            <ScrollView style={{ maxHeight: 300 }}>
              {[
                ['1 Heure', '10 DH/TTC', '8 DH/TTC', '-'],
                ['1 à 2 heures', '11 DH/TTC', '12 DH/TTC', '-'],
                ['2 à 3 heures', '13 DH/TTC', '14 DH/TTC', '-'],
                ['3 à 4 heures', '13 DH/TTC', '17 DH/TTC', '-'],
                ['4 à 5 heures', '16 DH/TTC', '19 DH/TTC', '-'],
                ['5 à 12 heures', '22 DH/TTC', '24 DH/TTC', '-'],
                ['12 à 24 heures', '40 DH/TTC', '40 DH/TTC', '48 DH/TTC'],
                ['Ticket perdu', '40 DH/TTC/Jour', '48 DH/TTC/Jour', '48 DH/TTC/Jour']
              ].map((row, index) => (
                <View key={index} style={styles.tableRow}>
                  {row.map((col, i) => (
                    <Text key={i} style={styles.cell}>{col}</Text>
                  ))}
                </View>
              ))}
            </ScrollView>
            <View style={styles.separator} />
            <Text style={styles.sectionTitle}>📞 Contact</Text>
            <TouchableOpacity style={styles.phoneButton} onPress={() => Linking.openURL('tel:0530421516')}>
              <Text style={styles.phoneButtonText}>📞 05 30 42 15 16</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.phoneButton} onPress={() => Linking.openURL('mailto:parkings@xperis-services.com')}>
              <Text style={styles.phoneButtonText}>✉️ parkings@xperis-services.com</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setParkingModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeText}>Fermer</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 20, paddingTop: 20, backgroundColor: '#F9FBFD', flex: 1 },
  searchCard: { backgroundColor: '#fff', borderRadius: 16, padding: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 4, marginBottom: 20 },
  searchTitle: { fontSize: 16, fontWeight: '700', color: '#333', marginBottom: 6 },
  searchSubtitle: { fontSize: 12, color: '#555', marginBottom: 16 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4F4F4', borderRadius: 8, paddingRight: 8 },
  searchIcon: { width: 20, height: 20, marginLeft: 10, marginRight: 6, resizeMode: 'contain' },
  input: { flex: 1, paddingVertical: 8, paddingHorizontal: 12, fontSize: 14, color: '#333', backgroundColor: '#F4F4F4', borderRadius: 8 },
  searchButton: { backgroundColor: '#4A90E2', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  searchButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
  sectionTitle: { fontSize: 16, fontWeight: '600', marginBottom: 14, color: '#333' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  quickItem: { width: '22%', height: 100, backgroundColor: '#fff', borderRadius: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowOffset: { width: 0, height: 1 }, shadowRadius: 4, elevation: 3 },
  activeCard: { shadowOpacity: 0.15, shadowRadius: 6, backgroundColor: '#EDF4FC' },
  iconImage: { width: 38, height: 38, marginBottom: 6, resizeMode: 'contain' },
  iconLabel: { fontSize: 12, color: '#333', fontWeight: '500' },
  activeLabel: { color: '#4A90E2', fontWeight: '700' },
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContent: { backgroundColor: '#fff', margin: 20, borderRadius: 12, padding: 20 },
  modalTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 16, textAlign: 'center' },
  tarifRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 4 },
  tarifDestination: { fontSize: 14, color: '#333' },
  tarifPrice: { fontSize: 14, fontWeight: '600', color: '#1a73e8' },
  separator: { height: 1, backgroundColor: '#ddd', marginVertical: 12 },
  phoneButton: {backgroundColor: '#eaf1ff',padding: 10,borderRadius: 10,marginBottom: 6,alignItems: 'center'},
  phoneButtonText: {color: '#1a73e8',fontWeight: '600',fontSize: 14},
  closeButton: { marginTop: 16, backgroundColor: '#ffdddd', padding: 10, borderRadius: 8, alignSelf: 'center' },
  closeText: { color: '#d00', fontWeight: '600' },
  tableHeader: { flexDirection: 'row', backgroundColor: '#e3f2fd', padding: 10, borderRadius: 8 },
  tableRow: { flexDirection: 'row', paddingVertical: 8, borderBottomWidth: 1, borderColor: '#ddd' },
  cell: { flex: 1, fontSize: 12, color: '#333' },
  header: { fontWeight: 'bold', color: '#0d47a1' }
});

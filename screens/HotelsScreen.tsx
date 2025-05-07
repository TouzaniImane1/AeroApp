import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const hotels = [
  {
    name: 'Marriott Jnan Palace',
    address: 'Avenue Allal El Fassi, Fès 30000',
    tags: ['Wi-Fi', 'Piscine', 'Spa', 'Salle de sport'],
    price: '1500 DH',
    distance: '5.7 km',
    stars: 5,
    image: require('../assets/hotel1.jpeg'),
    url: 'https://www.booking.com/hotel/ma/marriott-jnan-palace.fr.html'
  },
  {
    name: 'Zalagh Parc Palace',
    address: 'Lot Oued Fès, route de Meknès, Fès 30000',
    tags: ['Wi-Fi gratuit', 'Piscine', 'Restaurant'],
    price: '980 DH',
    distance: '7.2 km',
    stars: 4,
    image: require('../assets/hotel2.jpg'),
    url: 'https://www.booking.com/hotel/ma/zalagh-parc-palace.fr.html'
  },
  {
    name: 'Riad Fès – Relais & Châteaux',
    address: '5 Derb Zerbtana, Fès Médina',
    tags: ['Wi-Fi', 'Terrasse', 'Hammam', 'Spa', 'Restaurant'],
    price: '1900 DH',
    distance: '14.0 km',
    stars: 5,
    image: require('../assets/hotel3.jpg'),
    url: 'https://www.booking.com/hotel/ma/riad-fes.fr.html'
  },
  {
    name: 'Hotel Fès Inn',
    address: '47, rue 2, Sidi Brahim, Fès',
    tags: ['Wi-Fi', 'Parking', 'Climatisation'],
    price: '470 DH',
    distance: '3.5 km',
    stars: 3,
    image: require('../assets/hotel4.jpg'),
    url: 'https://www.booking.com/hotel/ma/fes-inn-and-spa.fr.html'
  },
  {
    name: 'Hotel Perla',
    address: '12 rue de la Palestine, Fès Ville Nouvelle',
    tags: ['Wi-Fi gratuit', 'Petit déjeuner inclus'],
    price: '320 DH',
    distance: '2.8 km',
    stars: 2,
    image: require('../assets/hotel5.jpg'),
    url: 'https://www.booking.com/hotel/ma/perla.fr.html'
  },
  {
    name: 'Hotel Nouzha',
    address: '7 Rue Hassan Dkhissi, Fès Ville Nouvelle',
    tags: ['Wi-Fi', 'Restaurant'],
    price: '400 DH',
    distance: '4.3 km',
    stars: 3,
    image: require('../assets/hotel6.jpg'),
    url: 'https://www.booking.com/hotel/ma/nouzha.fr.html'
  },
  {
    name: 'Riad Layalina Fes',
    address: '10 Derb El Miter, Fès El Bali',
    tags: ['Wi-Fi', 'Terrasse', 'Piscine', 'Petit déjeuner'],
    price: '720 DH',
    distance: '13.8 km',
    stars: 4,
    image: require('../assets/hotel7.jpg'),
    url: 'https://www.booking.com/hotel/ma/riad-layalina-fes.fr.html'
  },
  {
    name: 'Barcelo Fes Medina',
    address: '53 Avenue Hassan II, Fès Ville Nouvelle',
    tags: ['Wi-Fi gratuit', 'Spa', 'Piscine extérieure'],
    price: '850 DH',
    distance: '8.1 km',
    stars: 4,
    image: require('../assets/hotel8.jpg'),
    url: 'https://www.booking.com/hotel/ma/barcelo-fes-medina.fr.html'
  },
  {
    name: 'Palais Medina & Spa',
    address: 'Boulevard Allal El Fassi, Fès',
    tags: ['Wi-Fi', 'Spa', 'Piscine', 'Vue sur jardin'],
    price: '1100 DH',
    distance: '6.9 km',
    stars: 5,
    image: require('../assets/hotel9.jpg'),
    url: 'https://www.booking.com/hotel/ma/palais-medina-spa.fr.html'
  },
  {
    name: 'Riad Sara',
    address: '17 Derb El Gabasse, Douh, Batha, Fès Médina',
    tags: ['Wi-Fi gratuit', 'Terrasse', 'Restaurant'],
    price: '600 DH',
    distance: '12.2 km',
    stars: 4,
    image: require('../assets/hotel10.jpg'),
    url: 'https://www.booking.com/hotel/ma/riad-sara.fr.html'
  }
];

export default function HotelsScreen() {
  return (
    <ScrollView style={styles.container}>
      {hotels.map((hotel, index) => (
        <View key={index} style={styles.card}>
          <Image source={hotel.image} style={styles.image} />
          <View style={styles.distance}>
            <Ionicons name="location-outline" size={14} color="#444" />
            <Text>{hotel.distance}</Text>
          </View>
          <Text style={styles.name}>{hotel.name}</Text>
          <Text style={styles.address}>{hotel.address}</Text>
          <View style={styles.services}>
            {hotel.tags.map((s: string, i: number) => (
              <Text key={i} style={styles.service}>{s}</Text>
            ))}
          </View>
          <Text style={styles.price}>{hotel.price} <Text style={styles.nuit}>/nuit</Text></Text>
          <View style={styles.bottom}>
            <TouchableOpacity onPress={() => Linking.openURL(hotel.url)} style={styles.bookingNew}>
              <Ionicons name="bed-outline" size={18} color="#fff" />
              <Text style={styles.bookingTextNew}>Réserver sur Booking</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Lien vers Booking.com en bas de page */}
      <View style={styles.bookingBox}>
        <Text style={styles.bookingTitle}>📍 Explorer encore plus d'hôtels à Fès</Text>
        <Text style={styles.bookingSubtitle}>Booking.com vous propose une sélection complète d'établissements selon vos besoins</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.booking.com/city/ma/fes.fr.html')}
          style={styles.bookingMainButton}
        >
          <Ionicons name="search-outline" size={18} color="#1a73e8" />
          <Text style={styles.bookingMainText}>Voir plus d'hôtels sur Booking.com</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8f8f8',
    padding: 10
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 8
  },
  distance: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginBottom: 5,
    gap: 4
  },
  name: {
    fontSize: 18,
    fontWeight: '600'
  },
  address: {
    color: '#666',
    marginBottom: 6
  },
  services: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 10
  },
  service: {
    backgroundColor: '#eaf1ff',
    color: '#1a73e8',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  nuit: {
    fontWeight: '400',
    color: '#888'
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10
  },
  bookingNew: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a73e8',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 4
  },
  bookingTextNew: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 14
  },
  bookingBox: {
    backgroundColor: '#eaf1ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 30,
    alignItems: 'center'
  },
  bookingTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#333'
  },
  bookingSubtitle: {
    color: '#555',
    marginBottom: 12,
    textAlign: 'center'
  },
  bookingMainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  bookingMainText: {
    color: '#1a73e8',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 8
  }
});
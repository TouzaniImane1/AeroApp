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
  }
];

export default function HotelsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>🏨 Hôtels près de l'Aéroport</Text>
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
            <TouchableOpacity onPress={() => Linking.openURL(hotel.url)} style={styles.booking}>
              <Ionicons name="call-outline" size={18} color="#1a73e8" />
              <Text style={styles.bookingText}>Réserver</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}

      {/* Lien vers Booking.com en bas de page */}
      <View style={{
        backgroundColor: '#eaf1ff',
        padding: 16,
        borderRadius: 12,
        marginBottom: 30
      }}>
        <Text style={{ fontWeight: 'bold', marginBottom: 4 }}>Plus d'options sur Booking.com</Text>
        <Text style={{ color: '#777', marginBottom: 10 }}>Trouvez d'autres hôtels à Fès</Text>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.booking.com/city/ma/fes.fr.html')}
          style={{
            backgroundColor: '#fff',
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 8,
            alignItems: 'center'
          }}
        >
          <Text style={{ color: '#1a73e8' }}>Voir sur Booking.com</Text>
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
  booking: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e8f0fe',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20
  },
  bookingText: {
    color: '#1a73e8',
    marginLeft: 6
  }
});

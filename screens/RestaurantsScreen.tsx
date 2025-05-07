import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';

const restaurants = [
  {
    name: 'MEDINA',
    zone: 'Hall Public',
    image: require('../assets/resto1.avif'),
    description: 'Restaurant de cuisine marocaine et internationale dans un cadre moderne et convivial.'
  },
  {
    name: 'SUD ICE',
    zone: 'Hall Public / Sous Douane',
    image: require('../assets/resto2.jpg'),
    description: 'Salon de thé et glaces artisanales. Snacks et boissons pour les voyageurs.'
  }
];

export default function RestaurantsScreen() {
  return (
    <ScrollView style={styles.container}>
      {restaurants.map((restaurant, index) => (
        <View key={index} style={styles.card}>
          <Image source={restaurant.image} style={styles.image} />
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.zone}>📍 Zone : {restaurant.zone}</Text>
          <Text style={styles.description}>{restaurant.description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333'
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3
  },
  image: {
    width: '100%',
    height: 160,
    borderRadius: 8,
    marginBottom: 12
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a73e8'
  },
  zone: {
    color: '#555',
    marginVertical: 4,
    fontSize: 14
  },
  description: {
    fontSize: 14,
    color: '#444'
  }
});

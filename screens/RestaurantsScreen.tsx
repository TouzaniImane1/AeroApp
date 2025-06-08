import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const restaurants = [
  {
    id: 'resto1',
    name: 'MEDINA',
    zone: 'Hall Public',
    image: require('../assets/resto1.avif'),
    description: 'Restaurant de cuisine marocaine et internationale dans un cadre moderne et convivial.'
  },
  {
    id: 'resto2',
    name: 'SUD ICE',
    zone: 'Hall Public / Sous Douane',
    image: require('../assets/resto2.jpg'),
    description: 'Salon de thé et glaces artisanales. Snacks et boissons pour les voyageurs.'
  }
];

export default function RestaurantsScreen() {
  const [ratings, setRatings] = useState<{ [key: string]: number[] }>({});

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('restaurantRatings');
      if (stored) setRatings(JSON.parse(stored));
    })();
  }, []);

  const handleRate = async (id: string, stars: number) => {
    const updated = {
      ...ratings,
      [id]: [...(ratings[id] || []), stars]
    };
    setRatings(updated);
    await AsyncStorage.setItem('restaurantRatings', JSON.stringify(updated));
  };

  const getAverage = (id: string): number => {
    const votes = ratings[id] || [];
    if (votes.length === 0) return 0;
    return votes.reduce((a, b) => a + b, 0) / votes.length;
  };

  return (
    <ScrollView style={styles.container}>
      {restaurants.map((restaurant) => (
        <View key={restaurant.id} style={styles.card}>
          <Image source={restaurant.image} style={styles.image} />
          <Text style={styles.name}>{restaurant.name}</Text>
          <Text style={styles.zone}>📍 Zone : {restaurant.zone}</Text>
          <Text style={styles.description}>{restaurant.description}</Text>

          <Text style={{ marginTop: 8 }}>Note moyenne : {getAverage(restaurant.id).toFixed(1)} ★</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRate(restaurant.id, star)}>
                <FontAwesome
                  name={getAverage(restaurant.id) >= star ? 'star' : 'star-o'}
                  size={20}
                  color="#facc15"
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#f9f9f9' },
  card: {
    backgroundColor: '#fff', borderRadius: 12, padding: 16, marginBottom: 20,
    shadowColor: '#000', shadowOpacity: 0.1, shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6, elevation: 3
  },
  image: { width: '100%', height: 160, borderRadius: 8, marginBottom: 12 },
  name: { fontSize: 18, fontWeight: '600', color: '#1a73e8' },
  zone: { color: '#555', marginVertical: 4, fontSize: 14 },
  description: { fontSize: 14, color: '#444' },
  stars: { flexDirection: 'row', gap: 4, marginTop: 6 }
});
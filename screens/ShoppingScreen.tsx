import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const shops = [
  { id: 'shop1', name: 'DUFRY MAROC', zone: 'Sous Douane', image: require('../assets/dufry.jpg') },
  { id: 'shop2', name: 'INTERNATIONAL DUTY FREE SHOPS', zone: 'Sous Douane', image: require('../assets/dutyfree.jpg') },
  { id: 'shop3', name: 'KOUNOUZ EL YASMINE', zone: 'Sous Douane', image: require('../assets/yasmine.jpg') },
  { id: 'shop4', name: 'HUDSON', zone: 'Sous Douane', image: require('../assets/hudson.jpg') },
  { id: 'shop5', name: 'TABACS & JOURNAUX', zone: 'Sous Douane', image: require('../assets/tabac.jpg') },
  { id: 'shop6', name: 'TRESORS EL MAMOUN', zone: 'Sous Douane', image: require('../assets/mamoun.jpg') }
];

export default function ShoppingScreen() {
  const [ratings, setRatings] = useState<{ [key: string]: number[] }>({});

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem('shopRatings');
      if (stored) setRatings(JSON.parse(stored));
    })();
  }, []);

  const handleRate = async (id: string, stars: number) => {
    const updated = {
      ...ratings,
      [id]: [...(ratings[id] || []), stars]
    };
    setRatings(updated);
    await AsyncStorage.setItem('shopRatings', JSON.stringify(updated));
  };

  const getAverage = (id: string): number => {
    const votes = ratings[id] || [];
    if (votes.length === 0) return 0;
    return votes.reduce((a, b) => a + b, 0) / votes.length;
  };

  return (
    <ScrollView style={styles.container}>
      {shops.map((shop) => (
        <View key={shop.id} style={styles.card}>
          <Image source={shop.image} style={styles.image} />
          <Text style={styles.name}>{shop.name}</Text>
          <Text style={styles.zone}>{shop.zone}</Text>

          <Text style={{ marginTop: 8 }}>Note moyenne : {getAverage(shop.id).toFixed(1)} ★</Text>
          <View style={styles.stars}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => handleRate(shop.id, star)}>
                <FontAwesome
                  name={getAverage(shop.id) >= star ? 'star' : 'star-o'}
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
  container: { flex: 1, backgroundColor: '#F9FBFD', padding: 16 },
  card: {
    backgroundColor: '#fff', borderRadius: 12, marginBottom: 16, padding: 12,
    shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, alignItems: 'center'
  },
  image: { width: '100%', height: 140, borderRadius: 8, resizeMode: 'cover', marginBottom: 10 },
  name: { fontSize: 16, fontWeight: '600', color: '#333' },
  zone: { fontSize: 13, color: '#777', marginTop: 4, marginBottom: 6 },
  stars: { flexDirection: 'row', gap: 4, marginTop: 6 }
});
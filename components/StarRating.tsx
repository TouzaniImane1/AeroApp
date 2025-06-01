// components/StarRating.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  id: string; // identifiant unique du restaurant/boutique
}

export default function StarRating({ id }: Props) {
  const [rating, setRating] = useState(0);
  const [average, setAverage] = useState(0);
  const [votes, setVotes] = useState<number[]>([]);

  const storageKey = `rating_${id}`;

  useEffect(() => {
    (async () => {
      const stored = await AsyncStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        setVotes(parsed);
        setAverage(
          parsed.reduce((acc: number, val: number) => acc + val, 0) / parsed.length
        );
      }
    })();
  }, []);

  const handleVote = async (star: number) => {
    const newVotes = [...votes, star];
    await AsyncStorage.setItem(storageKey, JSON.stringify(newVotes));
    setVotes(newVotes);
    setAverage(newVotes.reduce((acc, val) => acc + val, 0) / newVotes.length);
    setRating(star);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Note moyenne : {average.toFixed(1)} ⭐</Text>
      <View style={styles.row}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleVote(star)}>
            <Ionicons
              name={star <= rating ? 'star' : 'star-outline'}
              size={24}
              color="#FFD700"
            />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 10
  },
  label: {
    fontSize: 13,
    color: '#444',
    marginBottom: 4
  },
  row: {
    flexDirection: 'row'
  }
});

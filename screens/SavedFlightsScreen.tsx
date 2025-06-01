import React, { useEffect, useState } from 'react';
import {
  View, Text, FlatList, StyleSheet, TouchableOpacity, Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SavedFlightsScreen() {
  const [flights, setFlights] = useState<any[]>([]);

  const loadFlights = async () => {
    const stored = await AsyncStorage.getItem('savedFlights');
    if (stored) setFlights(JSON.parse(stored));
  };

  const removeFlight = async (number: string) => {
    const filtered = flights.filter(f => f.number !== number);
    setFlights(filtered);
    await AsyncStorage.setItem('savedFlights', JSON.stringify(filtered));
  };

  useEffect(() => {
  loadFlights(); // appel normal
}, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mes Vols Enregistrés</Text>
      <FlatList
        data={flights}
        keyExtractor={(item) => item.number}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.text}>Vol : {item.number}</Text>
            <Text style={styles.text}>De {item.from} → {item.to}</Text>
            <Text style={styles.text}>Heure : {item.time}</Text>
            <TouchableOpacity onPress={() => removeFlight(item.number)}>
              <Text style={styles.remove}>❌ Supprimer</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center' }}>Aucun vol sauvegardé.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, flex: 1 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 16 },
  card: {
    backgroundColor: '#fff', padding: 12, marginBottom: 10, borderRadius: 8,
    shadowColor: '#000', shadowOpacity: 0.1, elevation: 2,
  },
  text: { fontSize: 14 },
  remove: { color: 'red', marginTop: 8 }
});

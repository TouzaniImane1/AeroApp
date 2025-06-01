import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MesVolsScreen = () => {
  const [savedFlights, setSavedFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedFlights = async () => {
      const data = await AsyncStorage.getItem('savedFlights');
      if (data) {
        setSavedFlights(JSON.parse(data));
      }
      setLoading(false);
    };
    fetchSavedFlights();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🛫 Mes vols enregistrés</Text>
      {loading ? (
        <ActivityIndicator />
      ) : savedFlights.length === 0 ? (
        <Text style={styles.empty}>Aucun vol enregistré pour le moment.</Text>
      ) : (
        savedFlights.map((flight, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.number}>{flight.number}</Text>
              <Text
                style={[styles.status, { color: flight.color || '#007bff' }]}
              >
                {flight.status}
              </Text>
            </View>
            <Text style={styles.airline}>{flight.airline}</Text>
            <Text style={styles.route}>{flight.from} → {flight.to}</Text>
            <Text style={styles.detail}>🕓 Heure : {flight.time}</Text>
            <Text style={styles.detail}>⏳ Durée : {flight.duration}</Text>
            <Text style={styles.detail}>💶 Prix estimé : {flight.price}</Text>
            <Text style={styles.detail}>🛫 Terminal : {flight.terminal} | Porte : {flight.gate}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  empty: { fontSize: 16, color: '#888', textAlign: 'center', marginTop: 20 },
  card: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  number: { fontWeight: 'bold', fontSize: 16 },
  status: { fontWeight: 'bold', fontSize: 14 },
  airline: { fontSize: 14, color: '#666' },
  route: { fontSize: 15, marginVertical: 4 },
  detail: { fontSize: 13, color: '#444', marginVertical: 1 },
});

export default MesVolsScreen;

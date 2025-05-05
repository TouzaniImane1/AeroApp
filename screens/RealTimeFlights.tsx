// screens/RealTimeFlightsScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import axios from 'axios';

const RealTimeFlights = () => {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://192.168.11.137:3000/flights/full') // Remplace ici aussi
      .then(response => {
        setFlights(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Vols en temps réel près de Fès</Text>
      {loading ? <ActivityIndicator /> : flights.map((flight, i) => (
        <View key={i} style={styles.card}>
          <Text style={styles.flight}>{flight.number} - {flight.airline}</Text>
          <Text style={styles.route}>{flight.from} → {flight.to}</Text>
          <Text style={styles.detail}>Heure : {flight.time}</Text>
          <Text style={[styles.status, { color: flight.color || 'black' }]}>Statut : {flight.status}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
  card: {
    backgroundColor: '#f0f9ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#2196f3',
  },
  flight: { fontWeight: 'bold', fontSize: 16 },
  route: { fontSize: 14, marginBottom: 4 },
  detail: { fontSize: 13, color: '#555' },
  status: { marginTop: 4, fontWeight: 'bold' },
});

export default RealTimeFlights;

// components/FlightSummary.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const FlightSummary = () => {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //axios.get('http://10.1.6.247:3000/flights/short') // mets ton IP
    axios.get('http://192.168.11.106:3000/flights/short') // mets ton IP

      .then(response => {
        
        setFlights(response.data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator /> : flights.map((flight, i) => (
        <View key={i} style={[styles.card, { borderLeftColor: flight.color || '#007bff' }]}>
          <View style={{ flex: 1 }}>
            <Text style={styles.route}>{flight.from} → {flight.to}</Text>
            <Text style={styles.airline}>{flight.airline}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.status, { color: flight.color || '#007bff' }]}>{flight.status}</Text>
            <Text style={styles.time}>{flight.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginTop: 10 },
  title: { fontSize: 16, fontWeight: 'bold', marginBottom: 12 },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#eee',
    borderLeftWidth: 4,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  route: { fontWeight: '600', fontSize: 14 },
  airline: { fontSize: 12, color: '#666' },
  status: { fontWeight: 'bold', fontSize: 14 },
  time: { fontSize: 12, color: '#444' },
});

export default FlightSummary;

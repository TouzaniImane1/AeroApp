// screens/RealTimeFlights.tsx 
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import { useRoute, RouteProp } from '@react-navigation/native';

type RouteParams = {
  query?: string;
};

const RealTimeFlights = () => {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const searchQuery = route?.params?.query?.toLowerCase() || '';

  useEffect(() => {
    axios
      .get('http://192.168.0.110:3000/flights/full')
      .then((response) => {
        setFlights(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Applique un filtre si une recherche a été saisie
  const filteredFlights = flights.filter((flight) =>
    flight.number?.toLowerCase().includes(searchQuery) ||
    flight.to?.toLowerCase().includes(searchQuery) // uniquement la destination
  );
  

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>✈️ Détails des vols vers/depuis Fès</Text>
      {loading ? (
        <ActivityIndicator />
      ) : (
        filteredFlights.map((flight, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.number}>{flight.number}</Text>
              <Text
                style={[
                  styles.status,
                  { color: flight.color || '#007bff' },
                ]}
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
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 16 },
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

export default RealTimeFlights;

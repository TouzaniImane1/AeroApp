import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, RouteProp } from '@react-navigation/native';

type RouteParams = {
  query?: string;
};

const RealTimeFlights = () => {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<string[]>([]);

  const route = useRoute<RouteProp<Record<string, RouteParams>, string>>();
  const searchQuery = route?.params?.query?.toLowerCase() || '';

  useEffect(() => {
    axios
      .get('http://192.168.11.102:3000/flights/full')
      .then((response) => {
        setFlights(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    AsyncStorage.getItem('savedFlights').then(data => {
      if (data) setSaved(JSON.parse(data).map((f: any) => f.number));
    });
  }, []);

  const toggleSave = async (flightNumber: string, flight: any) => {
    const savedFlights = await AsyncStorage.getItem('savedFlights');
    let list = savedFlights ? JSON.parse(savedFlights) : [];

    if (list.find((f: any) => f.number === flightNumber)) {
      list = list.filter((f: any) => f.number !== flightNumber);
    } else {
      list.push(flight);
    }

    await AsyncStorage.setItem('savedFlights', JSON.stringify(list));
    setSaved(list.map((f: any) => f.number));
  };

  const filteredFlights = flights.filter((flight) =>
    flight.number?.toLowerCase().includes(searchQuery) ||
    flight.to?.toLowerCase().includes(searchQuery)
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

            <TouchableOpacity
              onPress={() => toggleSave(flight.number, flight)}
              style={styles.saveIcon}
            >
              <Image
                source={require('../assets/enregistrer-instagram.png')}
                style={{
                  width: 24,
                  height: 24,
                  tintColor: saved.includes(flight.number) ? '#facc15' : '#ccc',
                }}
              />
            </TouchableOpacity>
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
    position: 'relative',
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
  saveIcon: {
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
});

export default RealTimeFlights;
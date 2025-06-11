import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FlightSummary = () => {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    axios.get('http://192.168.11.102:3000/flights/short')
      .then(response => {
        setFlights(response.data.slice(0, 3));
        setLoading(false);
      })
      .catch(() => setLoading(false));

    AsyncStorage.getItem('savedFlights').then(data => {
      if (data) setSaved(JSON.parse(data));
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
          <TouchableOpacity onPress={() => toggleSave(flight.number, flight)} >
            <Image
              source={require('../assets/enregistrer-instagram.png')}
              style={{ width: 24, height: 24, tintColor: saved.includes(flight.number) ? '#facc15' : '#ccc' }}
            />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginTop: 10 },
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
    alignItems: 'center',
    position: 'relative',
  },
  route: { fontWeight: '600', fontSize: 14 },
  airline: { fontSize: 12, color: '#666' },
  status: { fontWeight: 'bold', fontSize: 14 },
  time: { fontSize: 12, color: '#444' },
  
});

export default FlightSummary;

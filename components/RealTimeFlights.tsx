// components/RealTimeFlights.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';

export default function RealTimeFlights() {
  const [flights, setFlights] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlights = async () => {
      try {
        const response = await axios.get('https://opensky-network.org/api/states/all', {
          auth: {
            username: 'aya', // ⛔️ à remplacer
            password: '3!CV.SdBeWeLmYp',    // ⛔️ à remplacer
          },
          params: {
            lamin: 33.80,
            lamax: 34.10,
            lomin: -5.10,
            lomax: -4.80,
          },
        });

        if (response.data?.states) {
          setFlights(response.data.states);
        }
      } catch (error) {
        console.error('Erreur API OpenSky :', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlights();
    const interval = setInterval(fetchFlights, 10000); // mise à jour toutes les 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✈️ Vols en direct (Fès)</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4052EF" />
      ) : (
        <FlatList
          data={flights}
          keyExtractor={(item, index) => `${item[0]}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.flightBox}>
              <Text style={styles.flightText}>✈ {item[1] || 'N/A'} ({item[2] || 'Inconnu'})</Text>
              <Text style={styles.subText}>Altitude: {item[13] ? Math.round(item[13]) + ' m' : '---'}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4052EF',
    marginBottom: 12,
  },
  flightBox: {
    marginBottom: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingBottom: 8,
  },
  flightText: {
    fontSize: 14,
    fontWeight: '600',
  },
  subText: {
    fontSize: 12,
    color: '#555',
  },
});

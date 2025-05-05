import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const FlightStatus = () => {
  const [activeTab, setActiveTab] = useState<'arrivals' | 'departures'>('arrivals');

  const flights = {
    arrivals: [
      {
        from: 'Paris (CDG)',
        to: 'Fès (FEZ)',
        airline: 'Air France AF1234',
        status: 'À l\'heure',
        time: 'Arrivée 14:30',
        color: 'green',
      },
      {
        from: 'Londres (LHR)',
        to: 'Fès (FEZ)',
        airline: 'Ryanair FR5678',
        status: 'Retardé',
        time: 'Arrivée 16:45',
        color: 'orange',
      },
    ],
    departures: [
      {
        from: 'Fès (FEZ)',
        to: 'Madrid (MAD)',
        airline: 'Iberia IB789',
        status: 'À l\'heure',
        time: 'Départ 10:15',
        color: 'green',
      },
      {
        from: 'Fès (FEZ)',
        to: 'Marseille (MRS)',
        airline: 'Transavia TO456',
        status: 'Annulé',
        time: 'Départ 13:00',
        color: 'red',
      },
    ],
  };

  return (
    <View style={styles.container}>
      {/* Onglets */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'arrivals' && styles.activeTab]}
          onPress={() => setActiveTab('arrivals')}
        >
          <Text style={[styles.tabText, activeTab === 'arrivals' && styles.activeTabText]}>Arrivées</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'departures' && styles.activeTab]}
          onPress={() => setActiveTab('departures')}
        >
          <Text style={[styles.tabText, activeTab === 'departures' && styles.activeTabText]}>Départs</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des vols */}
      {flights[activeTab].map((flight, index) => (
        <View key={index} style={styles.card}>
          <View>
            <Text style={styles.route}>{flight.from} → {flight.to}</Text>
            <Text style={styles.airline}>{flight.airline}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[styles.status, { color: flight.color }]}>{flight.status}</Text>
            <Text style={styles.time}>{flight.time}</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff', borderRadius: 10, padding: 10, marginTop: 10 },
  tabs: { flexDirection: 'row', marginBottom: 10 },
  tab: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 5,
    alignItems: 'center',
  },
  activeTab: { backgroundColor: '#007bff' },
  tabText: { color: '#333' },
  activeTabText: { color: '#fff', fontWeight: 'bold' },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#f6fff6',
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  route: { fontWeight: '600' },
  airline: { fontSize: 12, color: '#666' },
  status: { fontWeight: 'bold', fontSize: 14 },
  time: { fontSize: 12 },
});

export default FlightStatus;

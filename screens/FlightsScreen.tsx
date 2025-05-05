// screens/FlightsScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import FlightSummary from '../components/FlightSummary';

export default function FlightsScreen() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Statut des vols</Text>
      <Text style={styles.subtitle}>Derniers vols en temps réel vers ou depuis Fès</Text>
      <FlightSummary />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
    paddingTop: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
});

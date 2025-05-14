// screens/TransportScreen.tsx

import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking, Image } from 'react-native';

export default function TransportScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.subtitle}>Réservez un moyen de transport directement :</Text>

      {/* ONCF */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => Linking.openURL('https://www.oncf-voyages.ma/')}
      >
        <Image
          source={require('../assets/train-icon.jpg')}
          style={styles.icon}
        />
        <Text style={styles.label}>Réserver un billet ONCF</Text>
      </TouchableOpacity>

      {/* CTM */}
      <TouchableOpacity
        style={styles.card}
        onPress={() => Linking.openURL('https://www.ctm.ma/')}
      >
        <Image
          source={require('../assets/bus-icon.jpg')}
          style={styles.icon}
        />
        <Text style={styles.label}>Réserver avec CTM</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f6f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
  },
});

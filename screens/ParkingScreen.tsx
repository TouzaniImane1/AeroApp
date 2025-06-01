import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ParkingScreen() {
  const navigation = useNavigation();

  const tarifs = [
    ['1 Heure', '10 DH/TTC', '8 DH/TTC', '-'],
    ['1 à 2 heures', '11 DH/TTC', '12 DH/TTC', '-'],
    ['2 à 3 heures', '11 DH/TTC', '14 DH/TTC', '-'],
    ['3 à 4 heures', '13 DH/TTC', '17 DH/TTC', '-'],
    ['4 à 5 heures', '16 DH/TTC', '19 DH/TTC', '-'],
    ['5 à 12 heures', '22 DH/TTC', '24 DH/TTC', '-'],
    ['12 à 24 heures', '40 DH/TTC', '40 DH/TTC', '48 DH/TTC'],
    ['Ticket perdu', '40 DH/TTC/Jour', '48 DH/TTC/Jour', '48 DH/TTC/Jour'],
  ];

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContent}>
        <Text style={styles.title}>🚗 Tarifs de stationnement – Aéroport Fès–Saïss</Text>

        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.header]}>Durée</Text>
          <Text style={[styles.cell, styles.header]}>Plein air</Text>
          <Text style={[styles.cell, styles.header]}>Autocars</Text>
          <Text style={[styles.cell, styles.header]}>Couvertes</Text>
        </View>

        <ScrollView style={{ maxHeight: 300 }}>
          {tarifs.map((row, index) => (
            <View key={index} style={styles.tableRow}>
              {row.map((col, i) => (
                <Text key={i} style={styles.cell}>{col}</Text>
              ))}
            </View>
          ))}
        </ScrollView>

        <View style={styles.separator} />

        <Text style={styles.sectionTitle}>📞 Contact</Text>
        <TouchableOpacity onPress={() => Linking.openURL('tel:0530421516')}>
          <Text style={styles.link}>📞 05 30 42 15 16</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:parkings@xperis-services.com')}>
          <Text style={styles.link}>✉️ parkings@xperis-services.com</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a237e',
    textAlign: 'center',
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 8,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cell: {
    flex: 1,
    fontSize: 12,
    color: '#333',
  },
  header: {
    fontWeight: 'bold',
    color: '#0d47a1',
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 12,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 14,
    marginBottom: 6,
    color: '#1a237e',
  },
  link: {
    fontSize: 14,
    color: '#1e88e5',
    marginBottom: 6,
  },
  closeButton: {
    marginTop: 16,
    backgroundColor: '#ffdddd',
    padding: 10,
    borderRadius: 8,
    alignSelf: 'center',
  },
  closeText: {
    color: '#d00',
    fontWeight: '600',
  },
});

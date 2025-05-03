import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';

export default function Home() {

  const [activeTab, setActiveTab] = useState('arrivals');
  const [searchQuery, setSearchQuery] = useState('');

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const services = [
    { icon: 'plane', label: 'Vols' },
    { icon: 'map', label: 'Carte' },
    { icon: 'car', label: 'Transport' },
    { icon: 'parking', label: 'Parking' },
    { icon: 'hotel', label: 'Hôtels' },
    { icon: 'shopping-bag', label: 'Shopping' },
  ];

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View style={styles.header}>
          <FontAwesome name="plane" size={20} color="#fff" />
          <Text style={styles.headerTitle}>Aéroport Fès-Saïss</Text>
          <FontAwesome name="bell" size={20} color="#fff" />
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={18} color="#999" style={styles.searchIcon} />
          <TextInput
            placeholder="Rechercher un vol, service..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Date */}
        <View style={styles.dateContainer}>
          <FontAwesome name="calendar" size={16} color="#666" />
          <Text style={styles.dateText}>  {formattedDate}</Text>
        </View>

        {/* Banner */}
        <View style={styles.bannerContainer}>
          <Image
            source={require('@/assets/images/ONDA.jpg')}
            style={styles.bannerImage}
          />
          <View style={styles.bannerOverlay}>
            <Text style={styles.bannerTitle}>Bienvenue à l'Aéroport Fès-Saïss</Text>
            <Text style={styles.bannerSubtitle}>Votre passerelle vers le Maroc</Text>
          </View>
        </View>

        {/* Flight Status */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Statut des Vols</Text>
            <Text style={styles.sectionLink}>Voir tout</Text>
          </View>

          <View style={styles.tabRow}>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'arrivals' && styles.tabActive]}
              onPress={() => setActiveTab('arrivals')}
            >
              <Text style={activeTab === 'arrivals' ? styles.tabActiveText : styles.tabText}>Arrivées</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tabButton, activeTab === 'departures' && styles.tabActive]}
              onPress={() => setActiveTab('departures')}
            >
              <Text style={activeTab === 'departures' ? styles.tabActiveText : styles.tabText}>Départs</Text>
            </TouchableOpacity>
          </View>

          {/* Fake flight list */}
          <View style={styles.flightCard}>
            <View>
              <Text style={styles.flightRoute}>Paris (CDG) → Fès (FEZ)</Text>
              <Text style={styles.flightInfo}>Air France AF1234</Text>
            </View>
            <View>
              <Text style={[styles.flightStatus, { color: 'green' }]}>À l'heure</Text>
              <Text style={styles.flightTime}>Arrivée 14:30</Text>
            </View>
          </View>

          <View style={styles.flightCard}>
            <View>
              <Text style={styles.flightRoute}>Londres (LHR) → Fès (FEZ)</Text>
              <Text style={styles.flightInfo}>Ryanair FR5678</Text>
            </View>
            <View>
              <Text style={[styles.flightStatus, { color: 'orange' }]}>Retardé</Text>
              <Text style={styles.flightTime}>Arrivée 16:45</Text>
            </View>
          </View>
        </View>

        {/* Services */}
        <Text style={styles.servicesTitle}>Services</Text>
        <View style={styles.servicesGrid}>
          {services.map((service, index) => (
            <Pressable key={index} style={styles.serviceItem} onPress={() => console.log(service.label)}>
              <View style={styles.serviceIcon}>
                <FontAwesome5 name={service.icon} size={24} color="#fff" />
              </View>
              <Text style={styles.serviceText}>{service.label}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Floating Assistant */}
      <TouchableOpacity style={styles.fab}>
        <FontAwesome name="headphones" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6F9FB' },
  header: {
    backgroundColor: '#1976D2',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  searchContainer: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 1 }, shadowRadius: 4,
  },
  searchIcon: { marginRight: 8 },
  searchInput: { flex: 1, height: 40 },
  dateContainer: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 8 },
  dateText: { color: '#555' },
  bannerContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: '#eee',
    position: 'relative',
  },
  bannerImage: { width: '100%', height: 140 },
  bannerOverlay: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(0,0,0,0.4)', padding: 10,
  },
  bannerTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  bannerSubtitle: { color: '#fff', fontSize: 12 },
  section: { marginTop: 16, marginHorizontal: 16, backgroundColor: '#fff', borderRadius: 12, padding: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontWeight: 'bold', fontSize: 16 },
  sectionLink: { color: '#1976D2', fontSize: 12 },
  tabRow: { flexDirection: 'row', marginBottom: 12 },
  tabButton: {
    flex: 1, paddingVertical: 6, borderRadius: 20, backgroundColor: '#eee', marginHorizontal: 4,
    alignItems: 'center',
  },
  tabActive: { backgroundColor: '#1976D2' },
  tabText: { color: '#444' },
  tabActiveText: { color: '#fff', fontWeight: 'bold' },
  flightCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F0FDF4',
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  flightRoute: { fontWeight: '600' },
  flightInfo: { fontSize: 12, color: '#666' },
  flightStatus: { fontWeight: '600', fontSize: 14 },
  flightTime: { fontSize: 12 },
  servicesTitle: { fontSize: 16, fontWeight: 'bold', marginLeft: 16, marginTop: 20 },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    padding: 16,
  },
  serviceItem: { alignItems: 'center', margin: 8, width: 80 },
  serviceIcon: {
    width: 60, height: 60, backgroundColor: '#1976D2',
    borderRadius: 30, justifyContent: 'center', alignItems: 'center',
    marginBottom: 6,
  },
  serviceText: { fontSize: 12, color: '#333', textAlign: 'center' },
  fab: {
    position: 'absolute', right: 20, bottom: 20,
    width: 48, height: 48, borderRadius: 24,
    backgroundColor: '#1976D2', justifyContent: 'center', alignItems: 'center',
    elevation: 4,
  },
});

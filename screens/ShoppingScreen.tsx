import React, { useState } from 'react'; 
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} from 'react-native';

const shops = [
  {
    name: 'DUFRY MAROC',
    zone: 'Sous Douane',
    image: require('../assets/dufry.webp')
  },
  {
    name: 'INTERNATIONAL DUTY FREE SHOPS',
    zone: 'Sous Douane',
    image: require('../assets/dutyfree.jpg')
  },
  {
    name: 'KOUNOUZ EL YASMINE',
    zone: 'Sous Douane',
    image: require('../assets/yasmine.jpeg')
  },
  {
    name: 'HUDSON',
    zone: 'Sous Douane',
    image: require('../assets/hudson.jpeg')
  },
  {
    name: 'BUDAS CATERING (Pâtisserie)',
    zone: 'Sous Douane',
    image: require('../assets/budas.jpg')
  },
  {
    name: 'TABACS & JOURNAUX',
    zone: 'Sous Douane',
    image: require('../assets/tabac.jpg')
  },
  {
    name: 'TRESORS EL MAMOUN',
    zone: 'Sous Douane',
    image: require('../assets/mamoun.jpeg')
  }
];

export default function ShoppingScreen() {
  return (
    <ScrollView style={styles.container}>
      {shops.map((shop, index) => (
        <View key={index} style={styles.card}>
          <Image source={shop.image} style={styles.image} />
          <Text style={styles.name}>{shop.name}</Text>
          <Text style={styles.zone}>{shop.zone}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FBFD',
    padding: 16,
  },
  header: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
    color: '#1a73e8',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center'
  },
  image: {
    width: '100%',
    height: 140,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 10
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333'
  },
  zone: {
    fontSize: 13,
    color: '#777',
    marginTop: 4
  }
});

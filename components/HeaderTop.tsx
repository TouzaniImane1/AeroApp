import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// ✅ Importer l'image locale
const logo = require('../assets/logo.webp'); // ✅ Pas d’erreur TypeScript


export default function HeaderTop() {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 16,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
      }}
    >
      {/* ✅ Gauche - Logo + Nom aéroport */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={logo} // ✅ image locale
          style={{ width: 20, height: 20, marginRight: 8 }}
          resizeMode="contain"
        />
        <View>
          <Text style={{ fontSize: 14, color: '#4052EF', fontWeight: 'bold' }}>Fès–Saïss</Text>
          <Text style={{ fontSize: 11, color: 'green' }}>● Opérationnel</Text>
        </View>
      </View>

      {/* ✅ Droite - Cloche + Loupe + Avatar */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ position: 'relative', marginRight: 12 }}>
          <TouchableOpacity style={{ backgroundColor: '#F0F0F0', borderRadius: 8, padding: 6 }}>
            <Ionicons name="notifications-outline" size={16} color="#333" />
          </TouchableOpacity>
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: 'red',
              position: 'absolute',
              top: 4,
              right: 4,
            }}
          />
        </View>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          style={{ width: 32, height: 32, borderRadius: 16 }}
        />
      </View>
    </View>
  );
}

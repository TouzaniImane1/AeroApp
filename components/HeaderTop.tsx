import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import UserIcon from '../assets/utilisateur.png'; // ✅ Ton icône utilisateur
const logo = require('../assets/logo.webp');

export default function HeaderTop() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

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
      {/* Gauche - Logo + Nom aéroport */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={logo}
          style={{ width: 20, height: 20, marginRight: 8 }}
          resizeMode="contain"
        />
        <View>
          <Text style={{ fontSize: 14, color: '#4052EF', fontWeight: 'bold' }}>Fès–Saïss</Text>
          <Text style={{ fontSize: 11, color: 'green' }}>● Opérationnel</Text>
        </View>
      </View>

      {/* Droite - Cloche + Avatar utilisateur */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* 🔔 Cloche de notification */}
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

        {/* 👤 Icône utilisateur cliquable */}
        <TouchableOpacity onPress={() => navigation.navigate('AuthScreen')}>
          <Image
            source={UserIcon}
            style={{ width: 22, height: 22, borderRadius: 16 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

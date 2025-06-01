import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import UserIcon from '../assets/utilisateur.png'; // ✅ Ton icône utilisateur
const logo = require('../assets/logo.webp');
const reclamation = require('../assets/réclamation.png');

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
          style={{ width: 50, height: 40, marginRight: 8 }}
          resizeMode="contain"
        />
        <View>
          <Text style={{ fontSize: 20, color: '#4052EF', fontWeight: 'bold' }}>Fès–Saïss</Text>
          <Text style={{ fontSize: 15, color: 'green' }}>● Opérationnel</Text>
        </View>
      </View>

      {/* Droite - Cloche + Avatar utilisateur */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* 🔔 Cloche de notification */}
        <View style={{ position: 'relative', marginRight: 12 }}>
          <TouchableOpacity>
          <Image
          source={reclamation}
          style={{ width: 22, height: 22, marginRight: 8 }}
          resizeMode="contain"
          />          
        </TouchableOpacity>
        </View>

        {/* 👤 Icône utilisateur cliquable */}
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen' as never)}>
          <Image
            source={UserIcon}
            style={{ width: 22, height: 22, borderRadius: 16 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

import React from 'react';
import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import UserIcon from '../assets/utilisateur.png';
const logo = require('../assets/logo.webp');
const reclamation = require('../assets/réclamation.png');

export default function HeaderTop() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>();

  const openReclamationEmail = () => {
    Linking.openURL('mailto:aero.réclamation@gmail.com');
  };

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
        </View>
      </View>

      {/* Droite - Boutons réclamation + utilisateur */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {/* 📩 Réclamation */}
        <TouchableOpacity
          onPress={openReclamationEmail}
          style={{ marginRight: 12 }}
        >
          <Image
            source={reclamation}
            style={{ width: 22, height: 22 }}
            resizeMode="contain"
          />
        </TouchableOpacity>

        {/* 👤 Icône utilisateur */}
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

import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { auth } from '../src/config/firebase';
// @ts-ignore
import { signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const [imageUri, setImageUri] = useState<string | null>(null);

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigation.navigate('AuthScreen' as never);
      })
      .catch((error: any) => Alert.alert('Erreur', error.message));
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mon Profil</Text>

      <TouchableOpacity onPress={handlePickImage}>
        <Image
          source={
            imageUri
              ? { uri: imageUri }
              : require('../assets/default-avatar.jpg') // à remplacer si tu veux une image par défaut
          }
          style={styles.avatar}
        />
        <Text style={styles.changePhoto}>Changer la photo</Text>
      </TouchableOpacity>

      <Text style={styles.email}>
        {user?.email || 'Utilisateur non identifié'}
      </Text>

      <Button title="Se déconnecter" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#f9fcff',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 30,
    color: '#1d3c78',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: '#1a73e8',
    marginBottom: 10,
  },
  changePhoto: {
    color: '#1a73e8',
    fontSize: 14,
    marginBottom: 20,
  },
  email: {
    fontSize: 16,
    marginBottom: 40,
    color: '#333',
  },
});

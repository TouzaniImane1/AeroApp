import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types/navigation';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AuthFormScreen'>;

export default function AuthFormScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '883380655979-23qa2vgjoqkfnqtirfv7o2lokkb4qh1i.apps.googleusercontent.com', // ⚠️ Remplace ici par ton vrai clientId
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication } = response;
      console.log('✅ Jeton Google :', authentication?.accessToken);
      navigation.replace('HomeScreen');
    }
  }, [response]);

  const registerUser = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
      return;
    }
    try {
      const response = await fetch('http://192.168.11.108:3001/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Succès', data.message);
        navigation.replace('LoginScreen');
      } else {
        Alert.alert('Erreur', data.message || 'Erreur lors de l’inscription');
      }
    } catch (err) {
      Alert.alert('Erreur', 'Connexion au serveur impossible');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Laisse-moi te connaître !</Text>

        <TextInput
          placeholder="Votre nom"
          style={styles.input}
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Adresse email"
          keyboardType="email-address"
          autoCapitalize="none"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Mot de passe"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          placeholder="Confirmer le mot de passe"
          secureTextEntry
          style={styles.input}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={registerUser}>
          <Text style={styles.buttonText}>Créer un compte →</Text>
        </TouchableOpacity>

        <Text style={styles.separator}>— ou —</Text>

        <TouchableOpacity style={styles.googleButton} disabled={!request} onPress={() => promptAsync()}>
          <Image
            source={require('../assets/google-icon.jpg')}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Continuer avec Google</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.replace('LoginScreen')}
        >
          <Text style={styles.footerLink}>Déjà un compte ? Se connecter</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#eef5ff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1f2937',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 30,
    marginBottom: 16,
    borderColor: '#e5e7eb',
    borderWidth: 1,
    fontSize: 15,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 30,
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separator: {
    textAlign: 'center',
    color: '#999',
    marginVertical: 16,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderRadius: 30,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  googleText: {
    color: '#444',
    fontSize: 15,
    fontWeight: 'bold',
  },
  footerLink: {
    textAlign: 'center',
    color: '#2563EB',
    marginTop: 24,
    fontWeight: '500',
  },
});
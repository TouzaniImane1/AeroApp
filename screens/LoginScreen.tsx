import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types/navigation';
import { useAuth } from '../contexts/AuthContext'; // ✅ import du contexte

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>;

export default function LoginScreen() {
  const navigation = useNavigation<NavigationProp>();
  const { login } = useAuth(); // ✅ utiliser login() pour activer la session
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      const response = await fetch('http://192.168.11.106:3001/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert(data.message);
        login(); // ✅ déclenche le rendu de HomeScreen via le contexte
      } else {
        Alert.alert(data.message || 'Erreur');
      }
    } catch (err) {
      Alert.alert('Erreur de connexion au serveur');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: '#f0f4ff' }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <SafeAreaView style={styles.container}>
        <Text style={styles.heading}>Connectez-vous !</Text>

        <TextInput
          placeholder="Adresse email"
          keyboardType="email-address"
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

        <TouchableOpacity style={styles.button} onPress={loginUser}>
          <Text style={styles.buttonText}>Se connecter</Text>
          <Ionicons name="arrow-forward" size={20} color="#fff" style={{ marginLeft: 6 }} />
        </TouchableOpacity>

        <Text style={styles.or}>— ou —</Text>

        <TouchableOpacity style={styles.googleButton}>
          <Image
            source={require('../assets/google-icon.jpg')}
            style={styles.googleIcon}
          />
          <Text style={styles.googleText}>Continuer avec Google</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.replace('AuthFormScreen', { mode: 'register' })}>
          <Text style={styles.switchLink}>Pas encore inscrit ? S’inscrire</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4ff',
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 25,
    marginBottom: 16,
    borderColor: '#cbd5e1',
    borderWidth: 1,
    fontSize: 16,
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: '#2563EB',
    paddingVertical: 14,
    borderRadius: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  or: {
    textAlign: 'center',
    color: '#6b7280',
    marginVertical: 18,
  },
  googleButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  googleIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
    marginRight: 10,
  },
  googleText: {
    fontSize: 16,
    color: '#374151',
    fontWeight: '500',
  },
  switchLink: {
    marginTop: 20,
    textAlign: 'center',
    color: '#2563EB',
    fontSize: 15,
  },
});

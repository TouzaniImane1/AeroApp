import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'YOUR_EXPO_CLIENT_ID',
  });

  const handleSubmit = () => {
    if (!email || !password || (!isLogin && (!name || !confirmPassword))) {
      Alert.alert('Tous les champs sont requis.');
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      Alert.alert('Les mots de passe ne correspondent pas.');
      return;
    }
    Alert.alert(isLogin ? 'Connexion réussie !' : 'Inscription réussie !');
  };

  const handleGoogleLogin = () => {
    promptAsync();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {isLogin ? 'Connectez-vous !' : 'Laisse-moi te connaître !'}
      </Text>

      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Votre nom"
          value={name}
          onChangeText={setName}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Adresse email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {!isLogin && (
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isLogin ? 'Se connecter' : 'Créer un compte'}
        </Text>
        <Ionicons
          name="arrow-forward-circle-outline"
          size={24}
          color="#fff"
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>

      <Text style={styles.or}>— ou —</Text>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleLogin}>
        <Ionicons
          name="logo-google"
          size={20}
          color="#333"
          style={{ marginRight: 6 }}
        />
        <Text style={{ color: '#333' }}>Continuer avec Google</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggle}>
          {isLogin
            ? "Pas encore inscrit ? S'inscrire"
            : 'Déjà un compte ? Se connecter'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#f0f6ff',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#1d3c78',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    height: 50,
    borderRadius: 30,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#d3e0f0',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#1a73e8',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    shadowColor: '#1a73e8',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  or: {
    textAlign: 'center',
    marginVertical: 20,
    color: '#888',
    fontWeight: '500',
  },
  googleButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#c9d5e9',
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggle: {
    textAlign: 'center',
    marginTop: 24,
    fontSize: 15,
    color: '#1a73e8',
    fontWeight: '500',
  },
});

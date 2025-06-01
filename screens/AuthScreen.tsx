import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../src/types/navigation';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'AuthScreen'>;

export default function AuthScreen() {
  const navigation = useNavigation<NavigationProp>();

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

  return (
    <ImageBackground
      source={require('../assets/bg-airport.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <Image
          source={require('../assets/logo-white.png')}
          style={styles.logo}
        />

        <Text style={styles.title}>Bienvenue à l’Aéroport Fès–Saïss</Text>
        <Text style={styles.subtitle}>Veuillez vous connecter ou vous inscrire pour continuer</Text>

        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => navigation.navigate('LoginScreen' as never)}
        >
          <Text style={styles.buttonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => navigation.navigate('AuthFormScreen', { mode: 'register' })}
        >
          <Text style={styles.buttonText}>S’inscrire</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.buttonGoogle]}
          disabled={!request}
          onPress={() => promptAsync()}
        >
          <Image
            source={require('../assets/google-icon.jpg')}
            style={styles.googleIcon}
          />
          <Text style={styles.buttonTextGoogle}>Continuer avec Google</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    marginBottom: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonPrimary: {
    backgroundColor: '#2563EB',
  },
  buttonSecondary: {
    backgroundColor: '#2563EB',
  },
  buttonGoogle: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonTextGoogle: {
    color: '#DB4437',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  googleIcon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
});
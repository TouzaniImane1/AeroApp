import React, { useEffect } from 'react';
import { View, Text, Button, Alert } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../contexts/AuthContext'; // seulement si tu as un contexte local

WebBrowser.maybeCompleteAuthSession();

export default function AuthGoogleScreen() {
  const navigation = useNavigation();
  const { login } = useAuth(); // si tu as un context local

  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '883380655979-23qa2vgjoqkfnqtirfv7o2lokkb4qh1i.apps.googleusercontent.com',
    // Tu peux ajouter aussi les scopes si tu veux : scopes: ['profile', 'email']
  });

  useEffect(() => {
    if (response?.type === 'success') {
      // Tu peux utiliser response.authentication.accessToken ici
      Alert.alert('Connexion Google réussie');
      login(); // si tu veux activer la navigation conditionnelle avec useAuth()
      navigation.navigate('HomeScreen' as never);
    }
  }, [response]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Connexion avec Google</Text>
      <Button
        title="Continuer avec Google"
        disabled={!request}
        onPress={() => promptAsync()}
      />
    </View>
  );
}

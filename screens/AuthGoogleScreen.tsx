// AuthGoogleScreen.tsx
import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import { getAuth, signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function AuthGoogleScreen() {
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: '1234567890-abcdef.apps.googleusercontent.com',
});

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .then(() => Alert.alert('Connexion réussie avec Google'))
        .catch((error) => Alert.alert('Erreur', error.message));
    }
  }, [response]);

  return (
    <View style={{ padding: 20 }}>
      <Button
        disabled={!request}
        title="Connexion avec Google"
        onPress={() => promptAsync()}
      />
    </View>
  );
}

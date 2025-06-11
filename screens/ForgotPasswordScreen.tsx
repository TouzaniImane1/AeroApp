import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    if (!email) return Alert.alert("Erreur", "Veuillez entrer votre adresse email");
    try {
      await axios.post('http://192.168.11.108:3001/api/reset-password-request', { email }); // ⬅️ adapte ton IP si besoin
      Alert.alert('Succès', 'Un lien a été envoyé à votre adresse email');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erreur', "Impossible d'envoyer l'e-mail");
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: '#f0f4ff' }}
    >
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 24 }}>
        <View style={{
          backgroundColor: '#fff',
          padding: 24,
          borderRadius: 30,
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 10,
          elevation: 5
        }}>
          <Text style={{
            fontSize: 24,
            fontWeight: 'bold',
            color: '#1e3a8a',
            textAlign: 'center',
            marginBottom: 8
          }}>
             Mot de passe oublié
          </Text>

          <Text style={{
            textAlign: 'center',
            fontSize: 14,
            color: '#64748b',
            marginBottom: 20
          }}>
            Entrez votre adresse email pour recevoir un lien de réinitialisation.
          </Text>

          <TextInput
            placeholder="Adresse email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            style={{
              backgroundColor: '#f8fafc',
              paddingVertical: 14,
              paddingHorizontal: 20,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: '#e2e8f0',
              fontSize: 15,
              marginBottom: 16
            }}
          />

          <TouchableOpacity
            onPress={handleResetPassword}
            style={{
              backgroundColor: '#2563EB',
              paddingVertical: 14,
              borderRadius: 30,
              alignItems: 'center'
            }}
          >
            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>
              📩 Envoyer le lien
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{
              textAlign: 'center',
              color: '#2563EB',
              fontSize: 14,
              marginTop: 18,
              textDecorationLine: 'underline'
            }}>
              Retour à la connexion
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

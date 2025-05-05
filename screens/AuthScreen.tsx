import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function AuthScreen() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = () => {
    if (isSignUp && !acceptTerms) {
      Alert.alert('Veuillez accepter les conditions.');
      return;
    }

    if (isSignUp && password !== confirm) {
      Alert.alert('Les mots de passe ne correspondent pas.');
      return;
    }

    Alert.alert(isSignUp ? 'Compte créé' : 'Connexion réussie');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <Text style={styles.subtitle}>
        {isSignUp
          ? 'Créez votre compte pour accéder à toutes les fonctionnalités'
          : 'Connectez-vous pour accéder à toutes les fonctionnalités'}
      </Text>

      {isSignUp && (
        <View style={styles.row}>
          <TextInput
            style={[styles.input, { flex: 1, marginRight: 8 }]}
            placeholder="Prénom"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Nom"
            value={lastName}
            onChangeText={setLastName}
          />
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="votre@email.com"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {isSignUp && (
        <TextInput
          style={styles.input}
          placeholder="Confirmer le mot de passe"
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />
      )}

      {isSignUp && (
        <View style={styles.checkboxContainer}>
          <Switch value={acceptTerms} onValueChange={setAcceptTerms} />
          <Text style={styles.checkboxLabel}>
            J’accepte les conditions générales d’utilisation
          </Text>
        </View>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>
          {isSignUp ? 'Créer un compte' : 'Se connecter'}
        </Text>
      </TouchableOpacity>

      <Text style={styles.separator}>— ou —</Text>

      <TouchableOpacity style={styles.googleButton}>
        <AntDesign name="google" size={20} color="#000" />
        <Text style={styles.googleText}>Continuer avec Google</Text>
      </TouchableOpacity>

      <View style={styles.footerRow}>
        <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
          <Text style={styles.footerLink}>
            {isSignUp ? 'Se connecter' : 'S’inscrire'}
          </Text>
        </TouchableOpacity>        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#444', marginBottom: 20 },
  input: {
    backgroundColor: '#F2F2F2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    fontSize: 14,
  },
  row: { flexDirection: 'row' },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 13,
    color: '#333',
  },
  button: {
    backgroundColor: '#1E40AF',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 4,
  },
  buttonText: { color: '#fff', fontSize: 16 },
  separator: {
    textAlign: 'center',
    marginVertical: 14,
    color: '#777',
  },
  googleButton: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  googleText: { fontSize: 14, color: '#000' },
  footerRow: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  footerLink: { color: '#1E40AF', fontSize: 14 },
  footerText: { fontSize: 14, color: '#555' },
});

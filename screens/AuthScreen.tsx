// screens/AuthScreen.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AuthScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bienvenue sur la page de connexion</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4052EF',
  },
});

export default AuthScreen;

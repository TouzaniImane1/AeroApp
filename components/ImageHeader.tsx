import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, ActivityIndicator, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import background from '../assets/fes-background.webp'; // adapte le nom


dayjs.locale('fr');

export default function ImageHeader() {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') return;
        const location = await Location.getCurrentPositionAsync({});
        const apiKey = 'a4b1e991c1f24869e155f96b2d9b5b11';
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&units=metric&lang=fr&appid=${apiKey}`
        );
        const data = await response.json();
        if (data && typeof data.main?.temp === 'number') {
          setWeather(data);
        }
        setLoading(false);
      } catch (err) {
        console.error("Erreur lors de la récupération de la météo :", err);
        setLoading(false);
      }
    })();
  }, []);

  return (
    <ImageBackground source={background} style={styles.image} imageStyle={styles.imageStyle}>
      <View style={styles.overlay}>
        <Text style={styles.timeText}>
          <Ionicons name="location-sharp" size={12} color="#00FFA3" /> {currentTime.format('HH:mm')}   –   {currentTime.format('dddd D MMM YYYY')}
        </Text>

        <Text style={styles.welcomeText}>Bienvenue à{'\n'}L'Aéroport Fès–Saïss</Text>
        <Text style={styles.subText}>Votre passerelle vers le monde</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoBox}>
            <Ionicons name="airplane" size={20} color="#00FFA3" />
            <Text style={styles.infoValue}>127</Text>
            <Text style={styles.infoLabel}>Vols aujourd'hui</Text>
          </View>
          <View style={styles.infoBox}>
            <MaterialCommunityIcons name="thermometer" size={20} color="#60A5FA" />
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <>
                <Text style={styles.infoValue}>
                  {typeof weather?.main?.temp === 'number' ? `${Math.round(weather.main.temp)}°C` : 'N/A'}
                </Text>
                <Text style={styles.infoLabel}>
                  {weather?.weather?.[0]?.description ?? 'Ensoleillé'}
                </Text>
              </>
            )}
          </View>
          <View style={styles.infoBox}>
            <FontAwesome5 name="user-friends" size={20} color="#C084FC" />
            <Text style={styles.infoValue}>12k</Text>
            <Text style={styles.infoLabel}>Passagers</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    height: 360,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  overlay: {
    padding: 24,
    backgroundColor: 'rgba(0,0,0,0.45)',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  timeText: {
    color: '#00FFA3',
    fontSize: 12,
    marginBottom: 4,
    fontWeight: '500',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subText: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 16,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  infoBox: {
    alignItems: 'center',
    flex: 1,
  },
  infoValue: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 6,
  },
  infoLabel: {
    color: '#fff',
    fontSize: 11,
    marginTop: 2,
  },
});

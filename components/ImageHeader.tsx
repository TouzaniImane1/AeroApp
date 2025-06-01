import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import dayjs from 'dayjs';
import 'dayjs/locale/fr';
import { Ionicons } from '@expo/vector-icons';

dayjs.locale('fr');

type ForecastItem = {
  dt_txt: string;
  main: {
    temp: number;
  };
  weather: {
    icon: string;
    description: string;
  }[];
};

const headerImages = [
  require('../assets/aéro1.avif'),
  require('../assets/aéro2.jpg'),
  require('../assets/aéro3.jpg'),
  require('../assets/aéro4.jpg'),
  require('../assets/fes-background.webp'),
];

export default function ImageHeader() {
  const [currentTime, setCurrentTime] = useState(dayjs());
  const [forecast, setForecast] = useState<ForecastItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [imageIndex, setImageIndex] = useState(0);

  // ⏰ Heure en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(dayjs());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 🌤️ Prévisions météo 5 jours (midi)
  useEffect(() => {
    (async () => {
      try {
        const apiKey = '537cddc5d0373c739cfed462ab45264a';
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Fès,MA&units=metric&lang=fr&appid=${apiKey}`
        );
        const data = await res.json();
        const filtered = data.list
          .filter((item: ForecastItem) => item.dt_txt.includes('12:00:00'))
          .slice(0, 5);
        setForecast(filtered);
      } catch (error) {
        console.error('Erreur météo prévisionnelle :', error);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // 🖼️ Changement automatique de l’image de fond
  useEffect(() => {
    const interval = setInterval(() => {
      setImageIndex((prev) => (prev + 1) % headerImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ImageBackground
      source={headerImages[imageIndex]}
      style={styles.image}
      imageStyle={styles.imageStyle}
    >
      <View style={styles.overlay}>
        <Text style={styles.timeText}>
          <Ionicons name="location-sharp" size={12} color="#00FFA3" />{' '}
          {currentTime.format('HH:mm')} – {currentTime.format('dddd D MMM YYYY')}
        </Text>

        <Text style={styles.welcomeText}>
          Bienvenue à{'\n'}L'Aéroport Fès–Saïss
        </Text>
        <Text style={styles.subText}>Votre passerelle vers le monde</Text>

        {loading ? (
          <ActivityIndicator size="small" color="#fff" style={{ marginTop: 10 }} />
        ) : (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.weatherList}
            data={forecast}
            keyExtractor={(item) => item.dt_txt}
            renderItem={({ item }) => (
              <View style={styles.weatherItem}>
                <Text style={styles.dayText}>{dayjs(item.dt_txt).format('ddd')}</Text>
                {item.weather?.[0]?.icon ? (
                  <Image
                    source={{
                      uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                    }}
                    style={styles.icon}
                  />
                ) : null}
                <Text style={styles.tempText}>
                  {Math.round(item.main.temp)}°C
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    height: Dimensions.get('window').height * 0.36,
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
    fontWeight: '500',
    marginBottom: 6,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subText: {
    color: '#fff',
    fontSize: 13,
    marginBottom: 12,
  },
  weatherList: {
    gap: 14,
    marginTop: 10,
  },
  weatherItem: {
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  dayText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  icon: {
    width: 40,
    height: 40,
  },
  tempText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
});

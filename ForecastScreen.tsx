// ForecastScreen.tsx
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Image, ScrollView } from 'react-native';
import axios from 'axios';

function ForecastScreen() {
  const [forecastData, setForecastData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Replace with your actual API endpoint and key
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(
          'https://api.openweathermap.org/data/2.5/forecast?q=Vancouver&appid=5ff1d84eec9490755344be081a337794&units=metric'
        );
        setForecastData(response.data);
      } catch (error) {
        console.error('Error fetching forecast:', error);
      } finally {
        setLoading(false);
      }
    };

    // Call the function to fetch data
    fetchWeatherData();
  }, []); // Empty dependency array means it runs once when the component mounts

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading forecast...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Weather Forecast</Text>
      {forecastData && forecastData.list.map((item: any, index: number) => (
        <View key={index} style={styles.forecastItem}>
          <Text style={styles.date}>{item.dt_txt}</Text>
          
          <View style={styles.weatherInfo}>
            <Image
              source={{ uri: `https://openweathermap.org/img/wn/${item.weather[0].icon}.png` }}
              style={styles.icon}
            />
            <Text style={styles.temp}>{Math.round(item.main.temp)}°C</Text>
          </View>

          <Text style={styles.description}>{item.weather[0].description}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

export default ForecastScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333',
  },
  forecastItem: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
  },
  weatherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 15,
  },
  temp: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#777',
  },
});

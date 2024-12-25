// HomeScreen.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

// Type for the navigation props
type HomeScreenProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

function HomeScreen({ navigation }: HomeScreenProps) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Forecast')}
    >
      <Text style={styles.text}>Go to Forecast</Text>
    </TouchableOpacity>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    color: '#007AFF',
  },
});

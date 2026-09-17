import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Dado({ valor }) {
  return (
    <View style={styles.dado}>
      <Text style={styles.numero}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  dado: {
    width: 60,
    height: 60,
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 5,
  },
  numero: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'black',
  },
});

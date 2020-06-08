import React from 'react';
import { View } from 'react-native';

// import { Container } from './styles';
// desestruturando para pegar o navigation do props
export default function User({ navigation }) {
    console.tron.log(navigation.getParam('user'));
  return <View/>
}

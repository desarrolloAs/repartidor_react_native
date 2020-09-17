import React, {Component} from 'react';
import axios from 'react-native-axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
  Icon
} from 'react-native';
import { color } from 'react-native-reanimated';

function Footer(props) {
  return (
    <View style={styles.container}>
        <View>
            <Text>Detalles Pedido</Text>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff',
        position: 'absolute',
        bottom:0,
        left:0,
        right:0,
        height: '20%'
    }
});

export default Footer;

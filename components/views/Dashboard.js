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

import Footer from './footer.js'
import Nav from './nav.js'

function Dashboard(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/img/fondo.png')} 
        style={styles.background}>
            <Nav props={{value: props.navigation}}></Nav> 
            
            <Footer  props={{value: props.navigation}}></Footer>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
 
    container: {
        flex: 1,
        flexDirection: 'column',
        // margin: 10,
        // marginTop: 50,
        // alignItems: "center",
      },
      background: {
        flex: 1,
        resizeMode: 'cover',
      },
      row : {
        flexDirection: 'row',
        width: '100%'
      },
      boxNav:{
        width:'33.33%',
        justifyContent: "center",
        alignItems: "center",
        borderColor: "#000",
        backgroundColor:"#18c92d",
        padding: 20
      },
      barBottom:{
        position: 'absolute',
        bottom:0,
        backgroundColor:'#18c92d'
      }
});

export default Dashboard;

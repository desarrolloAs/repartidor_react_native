import React, {Component} from 'react';
import axios from 'react-native-axios';
import Icon from 'react-native-vector-icons/FontAwesome';
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
} from 'react-native';
import { color } from 'react-native-reanimated';

function Nav(props) {
  return (
    <View style={[styles.container,styles.barBottom]}>
        <View  style={[styles.row]}>
            <TouchableOpacity style={[styles.left]} onPress={
              ()=> {
                props.props.value.openDrawer()
              }
            }>
            < Icon  name = "bars"  size = { 30 }  color = "#a3a3a3" / >
            </TouchableOpacity>
            <TouchableOpacity style={[styles.center]}>
              <Image
                style={styles.logo}
                resizeMode="contain"
                source={require('../assets/img/logo_as.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.right]}>
                <Text></Text>
            </TouchableOpacity>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
  barBottom: {
    backgroundColor:"#fcfcfc",
    
    height:'8%',
    borderWidth: 1,
    borderBottomColor: "#000",
    borderLeftColor: "transparent",
    borderTopColor: "transparent",
    borderRightColor: "transparent"
  },
  row : {
    flexDirection: 'row',
    width: '100%'
  },
  center: {
    textAlign:"left",
    flex:1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  left: {
    textAlign:"center",
    flex:1,
    justifyContent: 'flex-start',
    paddingTop: 10,
    left: 10
  },
  right: {
    textAlign:"right",
    flex:1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    
  },
  logo: {
    width: 100,
    height: 100,
    margin:0,
    padding: 0,
    transform: [{scale: 0.90}],
    alignItems: 'center',
    position:'absolute',
    top: -25,
  }
});

export default Nav;

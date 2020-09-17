import React, {Component} from 'react';
import axios from 'react-native-axios';
import {
  StyleSheet,
  View,
  Image,
  ImageBackground,
  AsyncStorage,
  ProgressBarAndroid
} from 'react-native';

import env from '../server/enviroment.js';



class Login extends Component {
  constructor(props) {
    super(props);
    this.state= {
      progress: 0.0
    }
  }

  loading= async()=>
  {
    const value = await AsyncStorage.getItem('user'); 

    var scope = this;    
       
    if(value == undefined || value == null)
    {
      scope.props.navigation.navigate("Login")
    }else {
      scope.props.navigation.navigate("Inicio")
    }
  }

  componentDidMount()
  {
    this.loading()
  }

  render() {
    const {progress} = this.state
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/img/fondo.png')}
          style={styles.background}>
          <View style={styles.form}>
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={require('../assets/img/logo_as.png')}
            />
          </View>
          <View style={styles.loading}>
            <ProgressBarAndroid 
              styleAttr="Horizontal" 
              color="#2196F3" 
              indeterminate={false}
              progress={progress} 
            />
          </View>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // margin: 10,
    // marginTop: 50,
    alignItems: "center",
    justifyContent: "center",

  },
  form: {
    margin: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
  },
  logo: {
    transform: [{scale: 0.55}],
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#dedede',
    color: '#000',
    fontWeight: 'bold',
    width: '90%',
    marginBottom: 4,
    borderRadius: 5,
    // textAlign: "center"
    fontSize: 16,
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  txtWithe: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  login: {
    backgroundColor: '#41bfb9',
    padding: 13,
    width: '90%',
    borderRadius: 5,
    color: '#fff',
    marginTop: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: { 
  }
});

export default Login;

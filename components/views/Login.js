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
  AsyncStorage
  
} from 'react-native';

import env from '../server/enviroment.js';

import * as coreStorage from './loader/asyncStorage.js'
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user:'REPPRU',
      password:'REPPRU',
    };
  }

  singIn = async () => {
  
    let uri = env.server + 'login.php';
     var formData = new FormData();
    formData.append("user", this.state.user);
    formData.append("password", this.state.password);
    fetch(uri, {
      method: 'POST',
      header: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: formData
    }).then((resposne) => resposne.json()).then((responseJson)=>{
      
       if(responseJson.result[0] && responseJson.result[0].id > 0)
       {
        
         AsyncStorage.setItem("user",JSON.stringify(responseJson.result[0]))
         this.props.navigation.navigate('Loading')
       }else {
         this.props.navigation.navigate('Loading')
       }
    }).catch((error)=>{
    })
  }

  render() {
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
            {/* usuario */}
            <Text style={styles.text}>Usuario</Text>
            <TextInput  value={this.state.user} style={styles.input} placeholder="Usuario"></TextInput>
            {/* password */}
            <Text style={styles.text}>Contraseña</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              textContentType="password"
              placeholder="Contraseña"
              value={this.state.password}></TextInput>
            {/* btn iniciar */}
            <TouchableOpacity style={styles.login} onPress={()=> {this.singIn()}}>
              <Text style={styles.txtWithe}>Iniciar Sesión</Text>
            </TouchableOpacity>
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
    // alignItems: "center",
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
});

export default Login;

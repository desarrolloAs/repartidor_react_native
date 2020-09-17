import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { createDrawerNavigator } from '@react-navigation/drawer';


import Login from '../views/Login.js'
import Dashboard from '../views/Dashboard.js'
import Orders from '../views/Orders.js'
import Map from '../views/Map.js'
import History from '../views/History.js'
import NavegationMap from '../views/Navigation_Map.js'
import Loading from '../views/Loading.js'
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
  AsyncStorage
  
} from 'react-native';



const Drawer = createDrawerNavigator();


gotTo = (value, props) => {
  props.navigation.navigate(value)
}
 
logOut = async (props) => {
  AsyncStorage.clear();
  props.navigation.navigate("Loading");
  // props.navigation.navigate("Loading")
}


function Menu(props){
 

  return (
    <View style={styles.drawer}>
      <View style={styles.banner}>
      <Image
              style={styles.logo}
              resizeMode="contain"
              source={require('../assets/img/logo_as.png')}
            />
      </View>
      <View style={styles.menu}>
        <TouchableOpacity onPress={() => {
          gotTo("Inicio",props)
        }} style={styles.btnDrawer}>
          <Text>Inicio</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          gotTo("Pedidos",props)
        }} style={styles.btnDrawer}>
          <Text>Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          gotTo("Historial Pedidos",props)
        }} style={styles.btnDrawer}>
          <Text>Historial Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          gotTo("Ubicacion Pedidos",props)
        }} style={styles.btnDrawer}>
          <Text>Ubicacion Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=> {
          logOut(props)
        }} style={styles.btnDrawer}>
          <Text>Cerrar Sesión</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

function navigationDrawer() {
  return (
    
    <NavigationContainer>
      
      <Drawer.Navigator drawerContent={(props)=> <Menu {...props}/>}>
        
        <Drawer.Screen name="Loading" component={Loading} />
        <Drawer.Screen name="Login" component={Login} />
        <Drawer.Screen name="Inicio" component={Dashboard} />
        <Drawer.Screen name="Pedidos" component={Orders} />
        <Drawer.Screen name="Historial Pedidos" component={History} />
        <Drawer.Screen name="Ubicacion Pedidos" component={Map} />
        <Drawer.Screen name="Navegacion" component={NavegationMap} />
      </Drawer.Navigator> 

      
    </NavigationContainer>

    

    
  );
}
const styles = StyleSheet.create({
  drawer:{
    backgroundColor:"#fff",
  },
  banner: {
    height: '45%',
    width: '100%',
    borderBottomColor: "#bdbdbd",
    borderBottomWidth: 1,
    marginBottom: 5
  },
  logo: {
    transform: [{scale: 0.80}],
    width: '100%',
    flex: 1
  },
  menu:{
    marginLeft: 5,
    marginRight: 5
  },
  btnDrawer: {
    
    // backgroundColor:"#1f9106",
    padding: 7,
    borderRadius: 3,
    marginBottom: 4
  }
});

export default navigationDrawer;
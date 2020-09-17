import React, {Component} from 'react';
import axios from 'react-native-axios';

import Geolocation from '@react-native-community/geolocation';
import Tts from 'react-native-tts';

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  BackAndroid,
  BackHandler
} from 'react-native';

import backAndroid, {
  hardwareBackPress,
  exitApp
} from 'react-native-back-android'

import Footer from './Footer_navigation.js';
import Nav from './nav.js';

import env from '../server/enviroment.js';

import MapStyle from './loader/map.json';
const API_KEY_GOOGLE = 'AIzaSyAqmcb_gKOcHu8nRu0tGMO-W0wK_OkBfHY';
import Map from './Map_direction.js'
class NavigationMap extends Component {

  constructor(props) {
    super(props);
    
    
    this.state = {
      region: null,
      origin: null,
      truck: null,
      order: null,
      house: null,
      is_load: false,
    };
  }

  direction = (res) => {
    var order = this.state.order;
    order.distance = parseInt(res.distance) + 'kilometros';
    order.tiempo = parseInt(res.duration) + 'Minutos';
    this.setState({order: order});
  };

  deliver = () => {
    alert('entregar');
  };

  handleHardwareBackPress = () => {
    Alert.alert(
      'Quiting',
      'Want to quit?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        { text: 'OK', onPress: () => exitApp() }
      ],
      { cancelable: false }
    );
    // return true to stop bubbling
    return true
  };

  MapLoad=()=>{
    
    Geolocation.watchPosition(
      ({coords}) => {
        console.log("entro")
        
        this.setState({
          truck: {
            latitude: coords.latitude,
            longitude: coords.longitude,
          },
          house: {
            latitude: parseFloat(this.state.order.dir_latitud),
            longitude: parseFloat(this.state.order.dir_longitud),
          },
          region: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          },
          origin: {
            latitude: parseFloat(this.state.order.dir_latitud),
            longitude: parseFloat(this.state.order.dir_longitud),
            latitudeDelta: 0.001,
            longitudeDelta: 0.001,
          },
          is_load:true,
        });
        
      },
      (error) => {
        // console.log("otra vez")
        // this.Map()
        
      },
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 100,
        distanceFilter: 10,
      },
    );
  };
  componentWillReceiveProps(nextProps)
  {
    this.setState({region: null, truck: null, origin: null,house:null, is_load:false,})
    this.setState({order:nextProps.route.params.order})
    this.MapLoad()
  }
  componentDidMount() {
    console.log("did")
    this.setState({region: null, truck: null, origin: null,house:null, is_load:false,})
    this.setState({order: this.props.route.params.order})
    this.MapLoad()
  }

  render() {
    console.log("rend")
    const {
      region,
      origin,
      PROVIDER_GOOGLE,
      truck,
      house,
      order,
      is_load
    } = this.state;
    if(this.state.is_load)
    {
      return (
        <View style={styles.container}>
          <View style={styles.map}>
  
            <Map {...this.state} />
          </View>
          
          <View style={styles.content}>
            <Text style={styles.txtBlack}>Detalles del Pedido</Text>
            <ScrollView vertically={true} style={{marginBottom: '10%'}}>
              <Text>Cliente:</Text>
              <Text>{order.cli_nombre}</Text>
              <Text>Dirección:</Text>
              <Text>{order.dir_direccion_completa}</Text>
              <Text>Observación:</Text>
              <Text>{order.ped_observaciones}</Text>
              <Text>Formas de Pago:</Text>
              <Text>{order.mp_descripcion}</Text>
            </ScrollView> 
  
            <TouchableOpacity
              style={styles.btnEnd}
              onPress={() => {
                this.deliver(order);
              }}>
              <Text style={styles.txtWithe}>Entregar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }else {
      return (
        <View style={styles.container}>
          <View style={styles.mapView}>
            <View >
              <Text>Cargando...</Text>  
            </View>
          </View>
          
          <View style={styles.content}>
            <Text style={styles.txtBlack}>Detalles del Pedido</Text>
            <ScrollView vertically={true} style={{marginBottom: '10%'}}>
              <Text>Cliente:</Text>
              <Text>Dirección:</Text>
              <Text>Observación:</Text>
              <Text>Formas de Pago:</Text>
              <Text>Distancia:</Text>
              <Text>LLegada estimada:</Text>
            </ScrollView> 
  
            <TouchableOpacity
              style={styles.btnEnd}
              onPress={() => {
                this.deliver(order);
              }}>
              <Text style={styles.txtWithe}>Entregar</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
   
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    position: 'absolute',
    bottom:0,
    left: 0,
    right:0,
    top: 0,
  },
  mapView: {
    height: '60%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    padding: '5%',
    backgroundColor: '#fff',
    borderWidth: 1,
    position: 'absolute',
    width: '100%',
    bottom:0
  },
  txtBlack: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 17,
    textAlign: 'center',
  },
  txtWithe: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 17,
  },
  btnEnd: {
    backgroundColor: '#eb3b2f',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tagInfo: {
    backgroundColor: '#fff',
  },
});

export default NavigationMap;

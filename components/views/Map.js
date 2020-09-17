import React, {Component} from 'react';
import axios from 'react-native-axios';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Directions from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-looped-carousel';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TextInput,
  Button,
  Item,
  Image,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';

import Footer from './Footer_navigation.js';
import Nav from './nav.js';

import env from '../server/enviroment.js';
import map_style from './loader/map.json';
const {width, height} = Dimensions.get('window');
class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      region: null,
      size: {width, height},
      origin: {
        latitude: 25.5411529,
        longitude: -103.3254404,
      },

      API_KEY_GOOGLE: 'AIzaSyApbuBgvzRwxvrdyRWfqB6xjZZuUQgrDE8',
      orderView: {},
      index:0,
      truck: null,
    };
  }

  getOrders = async () => {

    this.setState({orders: [], loading: true});
    let uri = env.server + 'surtir_pedidos.php';

    var formData = new FormData();
    formData.append('consulta', 1);
    formData.append('id_repartidor', 12);
    var Request = await fetch(uri, {
      method: 'POST',
      header: {'Content-Type': 'application/json', Accept: 'application/json'},
      body: formData,
    });

    var res = (await Request.json()).result;
    this.setState({orders: res, orderView:res[0], loading: false});
    
    
  };

  async componentDidMount() {
    this.getOrders();
    Geolocation.getCurrentPosition(
      ({coords}) => {
        this.setState({
          region: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.034,
          },
          truck: {
            latitude: coords.latitude,
            longitude: coords.longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.034,
          }
        });
      },
      (error) => {
      },
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 100,
        distanceFilter: 10,
      },
    );
  }

  next_order =()=>
  {
    const {orders,index} = this.state;
    
  }

  last_order =()=>
  {
    const {orders,index} = this.state;
  }

  render() {
    const {region, orders,truck,API_KEY_GOOGLE, PROVIDER_GOOGLE} = this.state;
    return (
      <View style={styles.container}>
        <Nav props={{value: this.props.navigation}}></Nav>
        <View style={styles.mapView}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.mapView}
            region={region}
           
            loadingEnabled
            customMapStyle={map_style}>

        {orders.map((data, i) => (
          <Marker 
            coordinate={ 
              {
                latitude: parseFloat(data.dir_latitud),
                longitude:parseFloat(data.dir_longitud),
                latitudeDelta: 0.0143,
                longitudeDelta: 0.034,
              }
            }
            image={require('../assets/icons/box.png')}>
              
            </Marker>
        ))}
            
              
            <Marker 
            coordinate={ 
              truck
            }
            image={require('../assets/icons/mover-truck.png')}>
            </Marker>
            </MapView>
        </View>

        <View style={styles.content}>
          <View style={styles.row}>
            <View>
              <TouchableOpacity>
                <Text style={styles.button_change}>Ant.</Text>  
              </TouchableOpacity>
              
            </View>
            <View>
              <Text style={styles.txtBlack}>Detalles del Pedido</Text>
              <Text style={styles.txtBlack}>Pedido:00000000</Text>
            </View>
            <View>
              <TouchableOpacity>
                <Text style={styles.button_change}>Sig.</Text>  
              </TouchableOpacity>
            </View>
          </View>
          
          <Text>Cliente:</Text>
          <Text>Dirección:</Text>
          <Text>Observación:</Text>
          <Text>Formas de Pago:</Text>
          <Text>Recibir</Text>
          <TouchableOpacity style={styles.btnEnd}>
            <Text style={styles.txtWithe}>En Ruta</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({  
  button_change:{
    fontSize: 15,
    marginRight: 10,
    marginLeft: 10,
    textAlign:"center",
    color:"#486e65"
  },
  row: {
    flexDirection: 'row',
    justifyContent:"center"
  },
  container: {
    backgroundColor: '#fff',
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    paddingRight: '5%',
    paddingLeft: '5%',
    height: '40%',
    marginLeft: '1%',
    marginRight: '1%',
    borderRadius: 10,
    backgroundColor: '#fff',
    position: 'absolute',
    borderColor: '#c2c2c2',
    borderWidth: 1,
    zIndex: 1,
    left: 0,
    right: 0,
    bottom: '8%',
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
    backgroundColor: '#20d91a',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '4%',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 9,
    borderBottomRightRadius: 9,
  },
});

export default Map;

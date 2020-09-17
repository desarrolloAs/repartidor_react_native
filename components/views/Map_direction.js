import React, {Component} from 'react';
import axios from 'react-native-axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Text,
  StyleSheet,
  View,
} from 'react-native';

import Geolocation from '@react-native-community/geolocation';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Directions from 'react-native-maps-directions';
import MapViewNavigation, {
  NavigationModes,
  TravelModeBox,
  TravelIcons,
  Geocoder,
  TravelModes,
  DirectionsListView,
  ManeuverView,
  DurationDistanceView,
} from 'react-native-maps-navigation';

const API_KEY_GOOGLE = 'AIzaSyAqmcb_gKOcHu8nRu0tGMO-W0wK_OkBfHY';
import MapStyle from './loader/map.json';
function MapDirection(props) {
    console.log(props)
   
        return (
            <View>
              <MapView
                  provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                  style={styles.mapita}
                  region={props.region}
                  loadingEnabled={true}
                  customMapStyle={MapStyle}
                 >
                   <Marker
                  coordinate={props.region}
                  image={require('../assets/icons/mover-truck.png')}>
                  </Marker>
                  <Marker
                      coordinate={props.origin}
                      image={require('../assets/icons/household.png')}></Marker> 
                  
      
                  <Directions
                  origin={props.region}
                  destination={props.origin}
                  apikey={API_KEY_GOOGLE}
                  strokeWidth={7}
                  strokeColor="#078adb"
                  language={'es'}
                  mode={'DRIVING'}
                  optimizeWaypoints={true}
                  precision={'high'}
                  ></Directions> 
              </MapView>
          </View>
      
        );
    
 
};
const styles = StyleSheet.create({
  mapita: {
      width: '100%',
      height: '100%'
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapDirection;

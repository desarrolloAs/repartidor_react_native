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


class Footer extends Component {
  constructor(props ) {
    super(props);
    this.state = {
        app: props
    };
  }
  goTo = (view,options) => {
     options.props.value.navigate(view)
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity style={[styles.row, styles.barBottom]}>
            <TouchableOpacity onPress={()=>{
                this.goTo("Pedidos",this.props)
            }} style={styles.boxNav}>
                < Icon  name="truck"  size = { 30 }  color = "#fff" / >
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                this.goTo("Historial Pedidos",this.props)
            }} style={styles.boxNav}>
              < Icon  name = "history"  size = { 30 }  color = "#fff" / >
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
                this.goTo("Ubicacion Pedidos",this.props)
            }} style={styles.boxNav}>
              < Icon  name = "map"  size = { 30 }  color = "#fff" / >
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  boxNav: {
    width: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#000',
    backgroundColor: '#1f9106',
    padding: 20,
  },
  barBottom: {
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#18c92d',
  },
  icons: {
    resizeMode: 'center',
    transform: [{scale: 0.2}],
    alignItems: 'center',
  },
});

export default Footer;

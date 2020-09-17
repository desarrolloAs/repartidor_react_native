import React, {Component} from 'react';
import AnimatedLoader from 'react-native-animated-loader';
import { AsyncStorage } from 'react-native';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Modal,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';

import Footer from './footer.js';
import Nav from './nav.js';

import env from '../server/enviroment.js';

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      age: '0',
      modalVisible: false,
      modalData: {
        productos:[],
        ped_total_pagar:0,
      },
      loading: true,
    };
    this.setState({})
  }

  getOrders = () => {
    this.setState({orders: [], loading: true});
    let uri = env.server + 'surtir_pedidos.php';

    var formData = new FormData();
    formData.append("consulta", 1);
    formData.append("id_repartidor", 12);

    fetch(uri, {
      method: 'POST',
      header: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: formData  
    })
      .then((resposne) => resposne.json())
      .then((responseJson) => {
        var data = [];
        var aux = [];
        var count = 0;
        for (let i = 0; i < responseJson.result.length; i++) {
          const element = responseJson.result[i];

          if (count == 0) {
            aux.push(element);
            count++;
          } else if (count == 1 || i == responseJson.result.length - 1) {
            aux.push(element);
            count = 0;
            data.push(aux);
            aux = [];
          }

          if (i == responseJson.result.length - 1) {
            if (aux.length == 1) {
              count = 0;
              data.push(aux);
              aux = [];
            }
          }
        }

        var scope = this;


          this.setState({orders: data, loading: false});
      })
      .catch((error) => {
        this.setState({orders: [], loading: false});
      });
      
  };

  componentWillMount()
  {
    this.getOrders()
    
  }

  seeOrder = (data) => {
    let uri = env.server + 'detalles_pedidos.php';

    var formData = new FormData();
    formData.append("consulta", 1);
    formData.append("id_pedido",data.id_pedido);

    fetch(uri, {
      method: 'POST',
      header: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: formData  
    })
      .then((resposne) => resposne.json())
      .then((responseJson) => {
        
        for (let i = 0; i < responseJson.result.length; i++) {
          const element = responseJson.result[i];
          console.log(element)
        }

        data.productos = responseJson.result;
        this.setState({modalData: data, modalVisible: true});
      })
      .catch((error) => {
      });
    
    
  };

  navigateTo = (data) => {
    this.props.navigation.navigate('Navegacion', {order:data})
    // navigation.navigate('Navegacion', {order:data});
  };
  closeModal = () => {
    this.setState({modalData: {productos:[],ped_total_pagar:0}, modalVisible: false});
  };


  changeStatus = (data, type)=>
  {
    let uri = env.server + 'repartidor_ac.php';

    var formData = new FormData();
    formData.append("consulta", type);
    formData.append("id_pedido",data.id_pedido);
    formData.append("id_repartidor", 12);

    fetch(uri, {
      method: 'POST',
      header: {'Content-Type': 'application/json', 'Accept': 'application/json'},
      body: formData  
    })
      .then((resposne) => resposne.json())
      .then((responseJson) => {
        this.getOrders()
      })
      .catch((error) => {
      });
    
  }

  toggleButton(element, props){
    console.log(element)
    
    if(element.id_status == 2)
    {
      return (
        <TouchableOpacity
          disabled={element.recogido}
          onPress={() => {
            this.changeStatus(element,1)
          }}
          style={styles.btnNavigate}>
          <Text style={styles.txtWhite}>Recoger</Text>
        </TouchableOpacity>
      )
    }
    if(element.id_status == 3) {
      return (
        <TouchableOpacity
          disabled={element.recogido}
          onPress={() => {
            this.changeStatus(element,3)
          }}
          style={styles.btnNavigate}>
          <Text style={styles.txtWhite}>En Camino</Text>
        </TouchableOpacity>
      )
    }

    if(element.id_status == 4) {
      return (
        <TouchableOpacity
          disabled={element.recogido}
          style={styles.btnNavigate}
          onPress={()=> {
            this.navigateTo(element)
          }}>
          <Text style={styles.txtWhite}>Tomar ruta</Text>
        </TouchableOpacity>
      )
    }
      
  }

  render() {
    const {orders, modalVisible, modalData, loading} = this.state;
    return (
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/img/fondo.png')}
          style={styles.background}>
          <Nav props={{value: this.props.navigation}}></Nav>
          <TouchableOpacity>
            <Text style={styles.title}>Mis Pedidos</Text>
          </TouchableOpacity>

          <AnimatedLoader
            visible={loading}
            overlayColor="rgba(255,255,255,0.70)"
            source={require('./loader/loader.json')}
            animationStyle={styles.lottie}
            speed={1}
          />
          <ScrollView vertically={true} style={{marginBottom: '20%'}}>
            {orders.map((data, i) => (
              <View style={styles.row} key={i}>
                {data.map((element, j) => (
                  <View style={styles.card} key={j}>
                    <TouchableOpacity style={styles.headerCard}>
                      <Text style={styles.txtWhite}>
                        Pedido:{element.ped_folio}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cardBody}>
                      <TouchableOpacity>
                        <Text style={styles.txtBlack}>Dirección:</Text>
                        <Text>{element.dir_direccion_completa}</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={styles.txtBlack}>Asignado: </Text>
                        <Text>{element.ci_fecha_asignacion}</Text>
                      </TouchableOpacity>
                      {/* <TouchableOpacity>
                        <Text style={styles.txtBlack}>
                          Tiempo Trascurrido:{' '}
                        </Text>
                      </TouchableOpacity> */}
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.row, styles.cardFooter]}>
                      <TouchableOpacity
                        style={styles.btnSee}
                        onPress={() => {
                          this.seeOrder(element);
                        }}>
                        <Text style={styles.txtWhite}>Ver</Text>
                      </TouchableOpacity>

                      {this.toggleButton(element, this.props.navigation)}
                      
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            ))}
          </ScrollView>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.mask_modal}>
              <View style={styles.modal}>
                <View style={[styles.row, styles.headerModal]}>
                  <TouchableOpacity
                    style={styles.closeModalbtn}
                    onPress={() => this.closeModal()}>
                    <Text>X</Text>
                  </TouchableOpacity>
                  <Text style={[styles.txtWhite]}>
                    Pedido:{modalData.ped_folio}
                  </Text>
                </View>
                <View style={styles.modalBody}>
                  <Text style={styles.txtBlack}>Cliente:</Text>
                  <Text>{modalData.cli_nombre}</Text> 
                  <Text style={styles.txtBlack}>Dirección:</Text>
                  <Text>{modalData.dir_direccion_completa}</Text>
                  <Text style={styles.txtBlack}>Observaciones</Text>
                  <Text>{modalData.ped_observaciones}</Text>
                  <Text style={styles.txtBlack}>Forma de Pago:</Text>
                  <Text>{modalData.mp_descripcion}</Text>

                  <View style={styles.split}></View>
                  <View style={styles.row}>

                    <Text style={styles.txtBlack ,{width: '33%'}}>Producto</Text>
                    <Text style={styles.txtBlack ,{width: '33%', textAlign:'right'}}>Cantidad</Text>
                    <Text style={styles.txtBlack ,{width: '33%', textAlign:'right'}}>Costo</Text>
                  </View>
                  <ScrollView vertically={true} style={{marginBottom: '10%'}}>
                  {
                    modalData.productos.map((data, i) => (
                      <View style={styles.cardProduct
                      }>
                        <Text styles={{  fontWeight: 'bold',color: '#000'}}>{data.producto}</Text>
                        <View style={styles.row}>
                        <Text style={{width: '33%'}}></Text>
                          <Text style={{width: '33%', textAlign:'right'}}> {data.pedet_cantidad} {data.unidad}</Text>
                          <Text style={{width: '33%', textAlign:'right'}}>$ {(data.pedet_precio_unitario * data.pedet_cantidad).toFixed(2)}</Text>
                        </View>
                      </View>
                    ))
                  }
                  </ScrollView>
                  <Text style={styles.txtBlack,{textAlign:'right', fontSize: 15}}>Costo Envio:</Text>
                  <Text style={{textAlign:'right', fontSize: 15, fontWeight:'bold'}}>${modalData.ped_total_pagar}</Text>
                  <Text style={styles.txtBlack,{textAlign:'right', fontSize: 15}}>Propina:</Text>
                  <Text style={{textAlign:'right', fontSize: 15, fontWeight:'bold'}}>${modalData.ped_total_pagar}</Text>
                  <Text style={styles.txtBlack,{textAlign:'right', fontSize: 20}}>Total a recibir:</Text>
                  <Text style={{textAlign:'right', fontSize: 20, fontWeight:'bold'}}>${modalData.ped_total_pagar}</Text>
                  
                </View>
                
                <View style={styles.modalFooter}>
                  {this.toggleButton(modalData,this.props.navigation)}
                </View>
              </View>
            </View>
          </Modal>
        </ImageBackground>
        <Footer props={{value: this.props.navigation}}></Footer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  title: {
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#ababab',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  txtWhite: {
    color: '#fff',
    textAlign: 'center',
    
  },
  txtBlack: {
    color: '#000',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    width: '48%',
    borderRadius: 10,
    margin: 3,
    borderColor: '#000',
  },
  headerCard: {
    backgroundColor: '#346fcf',
    padding: 8,
  },
  cardBody: {
    backgroundColor: '#fff',
    marginBottom: '27%',
  },
  cardFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  btnSee: {
    backgroundColor: '#346fcf',
    width: '50%',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
  },
  btnNavigate: {
    backgroundColor: '#1f9106',
    width: '50%',
    justifyContent: 'center',
    textAlign: 'center',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
  },
  mask_modal: {
    backgroundColor: '#0a0a0abf',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'white',
    shadowColor: '#000',
    position: 'absolute',
    top: 0,
    left:0,
    right: 0,
    bottom: 0
  },
  headerModal: {
    backgroundColor: '#346fcf',
    padding: 9,
    justifyContent: "center",

  },
  modalBody: {
    padding: 5,
    bottom:0,
    position: 'absolute',
    top: '5%',
    bottom: '9%'
  },
  modalFooter: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
    position: 'absolute',
    bottom: 0,
    left:  0,
    right: 0
  },
  closeModalbtn: {
    position: 'absolute',
    right: 5,
    top: 5,
    padding: 4,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  lottie: {
    width: 100,
    height: 150,
  },
  cardProduct: {
    marginTop: 6,
    borderColor:"#d1d1d1",
    borderWidth: 1,
    borderRadius: 5,
    padding: 4,
   
  },
  split: {
    borderColor:"#d1d1d1",
    borderWidth: 1,
    marginTop: 2,
    marginBottom: 2
  }
});

export default Orders;

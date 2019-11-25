import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Main extends Component {

  constructor() {
    super();
    this.state = {
      lancamentos: [],
    };
  }
  static navigationOptions = {
    tabBarIcon: () => (
      <Image
        source={require('../assets/img/homeIcon.png')}
        style={styles.icon}
      />
    )
  }


  componentDidMount() {
    this._carregarLancamentos();
  }


  _carregarLancamentos = async () => {

    const value = await AsyncStorage.getItem('@opflix:token');
    await fetch('http://192.168.5.84:5000/API/Lancamentos', {
      headers: {
        'Authorization': 'Bearer ' + value,
        'Content-Type': 'application/json'
      }
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({ lancamentos: data }))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (
      <View>
        <FlatList
          data={this.state.lancamentos}
          keyExtractor={item => item.idLancamento}
          renderItem={({ item }) => (
            <View style={styles.background}>
              <View style={styles.item}>
                <Text style={styles.titulo}>{item.titulo}</Text>
                <Text style={styles.text}>Categoria: {item.idCategoriaNavigation.categoria}</Text>
                <Text style={styles.text}>{item.sinopse}</Text>
                <Text style={styles.text}>Duração: {item.tempoDuracao}</Text>
                <Text style={styles.text}>Release: {item.dataLancamento}</Text>
                <Text style={styles.text}>Plataforma: {item.idFormatoNavigation.formato}</Text>
                <Text style={styles.text}>Veiculo: {item.idVeiculosNavigation.veiculo}</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  background: {
    backgroundColor: '#000',
  },
  titulo: {
    color: '#fff',
    fontSize: 25,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#3D36B9'
  },
  text: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
    margin: 2,
    fontSize: 17,
  },
  item: {
    backgroundColor: '#3D36B9',
    margin: 20,
  },
  icon: {
    width: 35,
    height: 35,
    tintColor: 'black'
  }
});

export default Main;
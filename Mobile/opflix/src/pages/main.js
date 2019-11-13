import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage, ImageBackground } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Image } from '../assets/img/banner.png'
class Main extends Component {

  constructor() {
    super();
    this.state = {
      lancamentos: [],
    };
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

        <View>
          <ImageBackground source={Image} style={{ width: 200, height: 200 }}>
            <View>
            </View>
          </ImageBackground>
        </View>
        <FlatList
          data={this.state.lancamentos}
          keyExtractor={item => item.idLancamento}
          renderItem={({ item }) => (
            <View>
              <Text>{item.idLancamento}</Text>
              <Text>{item.titulo}</Text>
              <Text>{item.idCategoriaNavigation.categoria}</Text>
              <Text>{item.sinopse}</Text>
              <Text>{item.tempoDuracao}</Text>
              <Text>{item.dataLancamento}</Text>
              <Text>{item.idFormatoNavigation.formato}</Text>
              <Text>{item.idVeiculosNavigation.veiculo}</Text>
            </View>
          )}
        />
      </View>
    );
  }
}

export default Main;
import React, {Component} from 'react';
import {Text, View, StyleSheet , AsyncStorage} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';

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

    await fetch('http://192.168.5.84:5000/api/Lancamentos' , {
        headers: {
            'Autorization' : 'Bearer' + value
        }
    })
      .then(resposta => resposta.json())
      .then(data => this.setState({lancamentos: data}))
      .catch(erro => console.warn(erro));
  };

  render() {
    return (
      <FlatList
        data={this.state.lancamentos}
        keyExtractor={item => item.idLancamento}
        renderItem={({item}) => (
          <View>
            <Text>{item.idLancamento}</Text>
            <Text>{item.titulo}</Text>
            <Text>{item.idCategoriaNavigation.categoria}</Text>
            <Text>{item.Sinopse}</Text>
            <Text>{item.tempoDuracao}</Text>
            <Text>{item.dataLancamento}</Text>
            <Text>{item.idFormatoNavigation.formato}</Text>
            <Text>{item.idVeiculoNavigation.veiculo}</Text>
          </View>
        )}
      />
    );
  }
}

export default Main;
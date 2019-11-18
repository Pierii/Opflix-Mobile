
import React, { Component, Fragment } from 'react';
import { Text, View, AsyncStorage, Picker, TouchableOpacity, StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

class Categorias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lancamentos: [
            ],
            categoriaEscolhida: null,
            categorias: []
        }
    }

    componentDidMount() {
        this._carregarLancamentos();
        this._carregarPlataformas();
    }

    _carregarLancamentos = async () => {
        await fetch('http://192.168.5.84:5000/API/lancamentos/listar/categoria/ ' + this.state.categoriaEscolhida, {
            headers: {
                "Accept": "application/json",
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
            },
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ lancamentos: data }))
            .catch(erro => console.warn(erro))
    }
    _carregarPlataformas = async () => {
        await fetch('http://192.168.5.84:5000/api/categorias', {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "Bearer " + await AsyncStorage.getItem("@opflix:token")
            }
        })
            .then(resposta => resposta.json())
            .then(data => this.setState({ categorias: data }))
            .catch(erro => console.warn(erro));
    };

    render() {
        return (

            <View>
                <Text>Filtrar lançamentos por categoria</Text>
                <Picker selectedValue={this.state.categoriaEscolhida} onValueChange={(itemValue) => this.setState({ categoriaEscolhida: itemValue })}>
                    <Picker.Item label="Escolha a plataforma:" value="0" selectedValue />
                    {this.state.categorias.map(e => {
                        return (<Picker.Item label={e.categoria} value={e.idCategoria} />
                        )
                    })}
                </Picker>
                <TouchableOpacity onPress={this._carregarLancamentos}>
                    <Text>Buscar</Text>
                </TouchableOpacity>
                <FlatList
                    data={this.state.lancamentos}
                    keyExtractor={item => item.idLancamento}
                    renderItem={({ item }) => (
                        <View>
                            {/* <Text style={{ width: 415, backgroundColor: '#26DBD6', textAlign: "center", fontSize: 20, color: '#000', }}>Sinopse</Text> */}
                            {/* <Text>{item.sinopse}</Text> */}
                            {< View >
                                <Text>{item.titulo}</Text>
                                <Text>{item.idCategoriaNavigation.categoria}</Text>
                                <Text>{item.sinopse}</Text>
                                <Text>{item.tempoDuracao}Minutos</Text>
                                <Text>{item.dataLancamento}</Text>
                                <Text>{item.idFormatoNavigation.formato}</Text>
                                <Text>{item.idVeiculosNavigation.veiculo}</Text>
                            </View>}
                        </View>
                    )}
                />
            </View>
        )
    }
}

export default Categorias
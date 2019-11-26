
import React, { Component } from 'react';
import { Text, View, AsyncStorage, Picker, TouchableOpacity, StyleSheet, Image } from 'react-native';
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
    
    static navigationOptions = {
        tabBarIcon: () => (
          <Image
            source={require('../assets/img/filterIcon.png')}
            style={styles.icon}
          />
        )
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
            <View style={styles.backGeral}>
                <View>
                    <Text style={styles.textTitulo}>Filtrar por categoria</Text>
                    <Picker style={styles.textTitulo} selectedValue={this.state.categoriaEscolhida} onValueChange={(itemValue) => this.setState({ categoriaEscolhida: itemValue })}>
                        <Picker.Item  label="Escolha a categoria:" value="0" selectedValue />
                        {this.state.categorias.map(e => {
                            return (<Picker.Item label={e.categoria} value={e.idCategoria} />
                            )
                        })}
                    </Picker>
                    <TouchableOpacity onPress={this._carregarLancamentos}>
                        <Text style={styles.btn} >Buscar</Text>
                    </TouchableOpacity>
                    <FlatList
                        data={this.state.lancamentos}
                        keyExtractor={item => item.idLancamento}
                        renderItem={({ item }) => (
                            <View style={styles.background}>
                                <View style={styles.item}>
                                    <Text style={styles.titulo}>{item.titulo}</Text>
                                    <Text style={styles.text}>Categoria: {item.idCategoriaNavigation.categoria}</Text>
                                    <Text style={styles.text}>Sinopse: {item.sinopse}</Text>
                                    <Text style={styles.text}>Duração: {item.tempoDuracao}</Text>
                                    <Text style={styles.text}>Release: {item.dataLancamento}</Text>
                                    <Text style={styles.text}>Plataforma: {item.idFormatoNavigation.formato}</Text>
                                    <Text style={styles.text}>Veículo: {item.idVeiculosNavigation.veiculo}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    backGeral: {
        backgroundColor: '#000',
        display: 'flex',
        flex: 1,
    },
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
    textTitulo: {
        fontSize: 40,
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#3D36B9',

    },
    btn: {
        backgroundColor: '#fff',
        color: '#000',
        textAlign: 'center',
        fontSize: 20,
        borderTopWidth: 4,
        borderColor: '#000', 
    },
    icon: {
        width: 45,
        height: 45,
        tintColor: 'white'
      }
});

export default Categorias
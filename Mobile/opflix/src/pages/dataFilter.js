import React, { Component } from 'react';
import { StyleSheet, Image, View, FlatList, Text, TouchableOpacity, Picker, AsyncStorage, ScrollView, TouchableHighlight } from 'react-native';


export default class DataFilter extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
            <Image
                source={require('../assets/img/dateIcon.png')}
                style={styles.icon}
            />
        )
    }

    constructor(props) {
        super(props);
        this.state = {
            lancamentos: [],
            listaFiltrada: [],
            DataEscolhida: null,
        }
    }

    componentDidMount() {
        this._carregarDataLancamento();

    }

    _logout = async () => {
        this.props.navigation.navigate('AuthStack');
    }

    _filtroData = async () => {
        await fetch('http://192.168.5.84:5000/api/lancamentos/filtroData/' + this.state.DataEscolhida, {
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

    _carregarDataLancamento = async () => {
        await fetch('http://192.168.5.84:5000/api/lancamentos', {
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

    _alterarData = async (item) => {
        this.setState({ listaFiltrada: this.state.lancamentos.filter(x => x.dataLancamento == item) })
    }

    render() {
        return (
            <View style={styles.backGeral}>
                <View>
                    <Text style={styles.textTitulo}>Filtrar por data</Text>
                    <Picker style={styles.textTitulo} selectedValue={this.state.DataEscolhida} onValueChange={this._alterarData}>
                        <Picker.Item label="Escolha a data:" value="0" />
                        {this.state.lancamentos.map(e => {
                            return (<Picker.Item label={e.dataLancamento} value={e.dataLancamento} />
                            )
                        })}
                    </Picker>
                        <TouchableOpacity onPress={this._filtroData}>
                            <Text style={styles.btn}>Buscar</Text>
                        </TouchableOpacity>
                        <FlatList 
                            data={this.state.listaFiltrada}
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
        );
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
        width: 35,
        height: 35,
        tintColor: 'white'
    }
});
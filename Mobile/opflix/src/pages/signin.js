import React, { Component } from 'react';
import { Text, View, TextInput, TouchableOpacity, AsyncStorage, StyleSheet, ImageBackground } from 'react-native';

import Logo from '../assets/img/logo.png'

class SignIn extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor() {
    super();
    this.state = {
      email: 'erik@email.com',
      senha: '123456',
    };
  }

  _realizarLogin = async () => {
    fetch('http://192.168.5.84:5000/api/Login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        senha: this.state.senha,
      }),
    })
      .then(resposta => resposta.json())
      .then(data => this._irParaHome(data.token))
      .catch(erro => console.warn('algo deu errado :c ' + erro));
  };

  _irParaHome = async (tokenRecebido) => {
    if (tokenRecebido != null) {
      try {
        await AsyncStorage.setItem('@opflix:token', tokenRecebido);
        this.props.navigation.navigate('MainNavigator');
      } catch (error) { }
    }
  };

  render() {
    return (
      <View style={styles.background}>
        <View style={styles.inputBackground}>
        <ImageBackground source={Logo} style={styles.logo}>
            <View>
            </View>
          </ImageBackground>

          <TextInput
            style={styles.input}
            placeholder="Endereço de Email"
            placeholderTextColor="#fff" 
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            placeholderTextColor="#fff" 
            onChangeText={senha => this.setState({ senha })}
            value={this.state.senha}
          />
          <TouchableOpacity onPress={this._realizarLogin} style={styles.btnLogin}>
            <Text style={styles.textBtn}>Fazer Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({

  background: {
    backgroundColor: '#000',
    flex: 1,
  },
  inputBackground: {
    backgroundColor: '#fff',
    marginTop: 150,
    margin: 35,
    paddingTop: 40,
    paddingBottom: 100,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#3D36B9',
    color: '#fff',
    width: 300,
    height: 45 ,
    borderRadius: 5,
    borderWidth: 1,
    fontSize: 20,
    marginBottom: 10,
  },
  logo:{
    width: 300,
    height: 110,
    marginTop: 10,
    marginBottom:40,
  },
  btnLogin: {
    backgroundColor: '#000',
    width: 250,
    borderRadius: 5,
    borderWidth: 1,  
    borderColor: '#3D36B9'
  },
  textBtn: {
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
  }
});

export default SignIn;
import React, {Component} from 'react';
import {Text, View, TextInput, TouchableOpacity, AsyncStorage, StyleSheet, Image} from 'react-native';

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
      } catch (error) {}
    }
  };

  render() {
    return (
      <View style={styles.background}>
      <View style={styles.inputBackground}>
      <Image source={Logo} style={{ width: 200 , height: 200}}>
      <View></View>
      </Image>

        <TextInput
          placeholder="email"
          onChangeText={email => this.setState({email})}
          value={this.state.email}
        />
        <TextInput
          placeholder="senha"
          onChangeText={senha => this.setState({senha})}
          value={this.state.senha}
        />
        <TouchableOpacity onPress={this._realizarLogin}>
          <Text>Login</Text>
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
  }
  });

export default SignIn;
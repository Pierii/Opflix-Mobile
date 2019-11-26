import React, { Component } from 'react';
import { Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';

class Logout extends Component {

    static navigationOptions = {
        tabBarIcon: () => (
            <Image 
                onPress={() => this._logout()}
                source={require('../assets/img/powerIcon.png')}
                style={styles.icon}
            />
        )
    }
    _logout = async () => {
        this.props.navigation.navigate('AuthStack');
    };

    render() {
        return (
            <View>
            <TouchableOpacity> 
                <Text onLayout={() => this._logout()}></Text>
            </TouchableOpacity>
            </View>
        )
    }
}
const styles = StyleSheet.create({ 
    icon: {
        width: 35,
        height: 35,
        tintColor: 'white'
    }
});
export default Logout
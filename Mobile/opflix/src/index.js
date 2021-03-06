import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import MainScreen from './pages/main';
import SignInScreen from './pages/signin';
import FilterScreen from './pages/filters';
import DataFilterScreen from './pages/dataFilter';
import LogoutScreen from './pages/logout';


const AuthStack = createStackNavigator({
  Sign: { screen: SignInScreen },
});

const MainNavigator = createBottomTabNavigator(
  {
    Main: {
      screen: MainScreen,
    },
      Filtros: {
        screen: FilterScreen
      },
      DataFilter: {
        screen: DataFilterScreen
      },
      Logout: {
        screen: LogoutScreen
      },
  },
  {
    tabBarOptions: {
      showIcon: true,
      showLabel: false,
      inactiveBackgroundColor: '#3D36B9',
      activeBackgroundColor: '#2C2787',
      style: {
        width: '100%',
        height: 50,
      },
    },
  },
);
export default createAppContainer(
  createSwitchNavigator(
    {
      MainNavigator,
      AuthStack,
    },
    {
      initialRouteName: 'AuthStack',
      
    },
  ),
);


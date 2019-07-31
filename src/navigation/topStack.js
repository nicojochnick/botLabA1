import React, {Component} from 'react';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../views/home';
import CreateView from '../views/createView'
import Login from '../views/auth/login';
import SignUp from '../views/auth/signUp';
import Loading from '../views/loading';

class TopStack extends Component {
    static navigationOptions = {
        title: 'Home',
    };
    render() {
    }
}

const AuthStack = createStackNavigator({
    Login: Login,
    SignUp: SignUp
},{
    initialRouteName: "SignUp"
});


const AppStack = createStackNavigator(
    { Home: Home, Add: CreateView
    }, { defaultNavigationOptions: ({ navigation }) => ({
            headerTransparent: true,
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home'){
                    iconName = `md-person`;
                }
                return <IconComponent style = {{marginTop: 9}} name={iconName}  size={24} color={tintColor} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'dodgerblue',
            inactiveTintColor: 'gray',
        },
    }
);

const AppContainer =  createAppContainer(createSwitchNavigator(
    {
        AuthLoading: Loading,
        App: AppStack,
        Auth: AuthStack,
    }, {
        initialRouteName: "AuthLoading"
    }
));
export default AppContainer;

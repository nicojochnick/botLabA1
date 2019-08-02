import React, {Component} from 'react';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../views/homeScreen';
import AddStepScreen from '../views/addStepScreen'
import Login from '../views/auth/login';
import SignUp from '../views/auth/signUp';
import LoadingScreen from '../views/loadingScreen';

class TopStack extends Component {
    static navigationOptions = {
        title: 'HomeScreen',
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
    { Home: HomeScreen, Add: AddStepScreen
    }, { defaultNavigationOptions: ({ navigation }) => ({
            headerTransparent: true,
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'HomeScreen'){
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
        AuthLoading: LoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    }, {
        initialRouteName: "AuthLoading"
    }
));
export default AppContainer;

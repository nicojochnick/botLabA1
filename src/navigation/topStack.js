import React, {Component} from 'react';
import {createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../views/homeScreen';
import AddStepScreen from '../views/addStepScreen'
import Login from '../views/auth/login';
import SignUp from '../views/auth/signUp';
import LoadingScreen from '../views/loadingScreen';
import createIconButtonComponent from 'react-native-vector-icons/lib/icon-button';
import FriendGoalView from '../views/friendGoalView';

class TopStack extends Component {
    render() {
    }
}

const AuthStack = createStackNavigator({
    Login: Login,
    SignUp: SignUp

},{
    initialRouteName: "SignUp",
    headerTransparent: true,
    defaultNavigationOptions: {
        headerTransparent: true,
        headerStyle: {
            backgroundColor: '#186aed',
        },
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    },
});

const AppDrawer = createBottomTabNavigator(
    { Home: HomeScreen, FriendView: FriendGoalView
    }, { defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home'){
                    iconName = `ios-contact`;
                } else if (routeName === 'FriendView') {
                    iconName = 'ios-contacts'
                }
                return <IconComponent style = {{marginTop: 9}} name={iconName}  size={28} color={'#186aed'} />;
            },
        }),
        tabBarOptions: {
            activeTintColor: 'dodgerblue',
            inactiveTintColor: 'gray',
            showLabel: false,


        },
    }
);

const AppContainer =  createAppContainer(createSwitchNavigator(
    {
        AuthLoading: LoadingScreen,
        App: AppDrawer,
        Auth: AuthStack,
    }, {
        headerTransparent: true,
        initialRouteName: "AuthLoading"
    },
));
export default AppContainer;

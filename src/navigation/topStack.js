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


const AppDrawer = createBottomTabNavigator(
    { Home: HomeScreen, FriendView: FriendGoalView
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
        App: AppDrawer,
        Auth: AuthStack,
    }, {
        initialRouteName: "AuthLoading"
    }
));
export default AppContainer;

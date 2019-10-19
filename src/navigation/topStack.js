import React, {Component} from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from '../views/homeScreen';
import AddStepScreen from '../views/addStepScreen'
import Login from '../views/auth/login';
import SignUp from '../views/auth/signUp';
import LoadingScreen from '../views/loadingScreen';
import createIconButtonComponent from 'react-native-vector-icons/lib/icon-button';
import FriendGoalView from '../views/friendGoalView';
import FeedView from '../views/FeedView';
import UserTag from '../components/user/userTag';
import NotificationScreen from '../views/notificationScreen';
import TribeSingleScreen from '../views/tribeSingleScreen';
import SlideMenuRoot from '../components/slideMenu/slideMenuRoot';
import {createDrawerNavigator} from 'react-navigation-drawer';

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

const HomeStack =  createStackNavigator(
    {
        Home: HomeScreen, OtherHome: HomeScreen
    }, {
        initialRouteName: "Home",
        headerTransparent: true,
    }
);


// const SlideMenu = createStackNavigator(
//     {
//         SecondScreen: {
//             screen: SlideMenuRoot,
//         }
//     },
//     {
//         navigationOptions: ({ navigation }) => ({
//             initialRouteName: 'SecondScreen',
//             headerMode: 'screen',
//             headerTitle: 'Second Screen Header',
//             drawerLabel: 'Second Screen',
//         }),
//     }
// );



const FeedStack =  createStackNavigator(
    {
        FeedView: FeedView,
        FriendHome: HomeScreen
    }, {
        initialRouteName: "FeedView",
        headerTransparent: true,
        drawerBackgroundColor: '#282C33'

    }
);

const slideMenu = createDrawerNavigator({
        Feed: {
            screen: FeedStack,
        },
        // Menu: {
        //     screen: SlideMenuRoot,
        // },
    }, {

    contentComponent: SlideMenuRoot,
    initialRouteName: 'Feed',
        drawerType: 'slide',
    }
);


// const tribeStack =  createStackNavigator(
//     {
//         Feed: FeedView, TribeScreen: TribeSingleScreen
//     }, {
//         initialRouteName: "FeedView",
//         headerTransparent: true,
//     }
// );

const AppDrawer = createBottomTabNavigator(
    { FeedView: slideMenu, Home: HomeStack, Notifications: NotificationScreen
    }, { defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'Home'){
                    iconName = `ios-contact`;
                } else if (routeName === 'FeedView') {
                    iconName = 'ios-home'
                } else if (routeName === 'Notifications') {
                    iconName = 'ios-heart'
                }
                return <IconComponent style = {{marginTop: 9}} name={iconName} color = {tintColor} size={28}  />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#2067ff',
            inactiveTintColor: 'lightgrey',
            showLabel: false,
            style: {
                backgroundColor: '#333740',
            },

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

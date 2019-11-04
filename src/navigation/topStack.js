import React, {Component} from 'react';

import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';
import UserView from '../views/userView';
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
import HomeView from '../views/homeView';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {View, Text} from 'react-native'

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
        Home: UserView, OtherHome: UserView
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
        FriendHome: UserView
    }, {
        initialRouteName: "FeedView",
        headerTransparent: true,
        drawerBackgroundColor: '#FDFDFD'

    }
);

const slideMenu = createStackNavigator({
        Feed: FeedStack,
        Menu: HomeView,
    }, {
    headerTransparent: true,

    // contentComponent: SlideMenuRoot,

    initialRouteName: 'Menu',

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
    { FeedView: slideMenu, User: UserView, Notifications: NotificationScreen
    },
    {

        // initialRouteName: "Home",

        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, horizontal, tintColor }) => {
                const { routeName } = navigation.state;
                let IconComponent = Ionicons;
                let iconName;
                if (routeName === 'User'){
                    iconName = `ios-contact`;
                } else if (routeName === 'FeedView') {
                    iconName = 'ios-home'
                } else if (routeName === 'Notifications') {
                    iconName = 'ios-paper'
                    // IconComponent = IconWithBadge;
                }
                return  <IconComponent style = {{marginTop: 9}} name={iconName} color = {tintColor} size={25}  />;
            },
        }),
        tabBarOptions: {
            activeTintColor: '#2067ff',
            inactiveTintColor: 'lightgrey',
            showLabel: false,
            style: {
                backgroundColor: '#FDFDFD',
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


class IconWithBadge extends React.Component {
    render() {
        const { tintColor} = this.props;
        return (
            <View style={{ width: 24, height: 24, margin: 5 }}>
                <Ionicons name={'ios-paper'} size={25} color={tintColor} />
                {1 > 0 && (
                    <View
                        style={{
                            // If you're using react-native < 0.57 overflow outside of parent
                            // will not work on Android, see https://git.io/fhLJ8
                            position: 'absolute',
                            right: -6,
                            top: -3,
                            backgroundColor: 'red',
                            borderRadius: 6,
                            width: 12,
                            height: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {/*<Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>*/}
                        {/*    {0}*/}
                        {/*</Text>*/}
                    </View>
                )}
            </View>
        );
    }
}



export default AppContainer;

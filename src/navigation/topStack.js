import React, {Component} from 'react';
import {createAppContainer, createStackNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../views/home';
import CreateView from '../views/createView'

class TopStack extends Component {
    static navigationOptions = {
        title: 'Home',
    };
    render() {
    }
}




const AppNavigator = createStackNavigator(
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

const AppContainer =  createAppContainer(AppNavigator);
export default AppContainer;

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {ScrollView,View, FlatList,} from 'react-native';
import {Avatar, ListItem} from 'react-native-elements';
import {styles} from '../theme'



const list = [
    {
        name: 'Amy Farha',
        subtitle: 'Vice President',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',

    },
    {
        name: 'Chris Jackson',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
        subtitle: 'Vice Chairman'
    },
    {
        name: 'Amy Farha',
        subtitle: 'Vice President',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',

    },
    {
        name: 'Amy Farha',
        subtitle: 'Vice President',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',

    },
    {
        name: 'Amy Farha',
        subtitle: 'Vice President',
        avatar_url: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',

    },
];



class TribeGroup extends Component {

    keyExtractor = (item, index) => index.toString();

    renderItem = ({ item }) => (
        <ListItem
            title={item.name}
            subtitle={item.subtitle}
            leftAvatar={{
                source: item.avatar_url && { uri: item.avatar_url },
                title: item.name[0]
            }}
        />
    );
    render() {
        return (
            <View style = {styles.groupScrollContainer}>
            <ScrollView style = {styles.groupScroll}>
                <FlatList
                    listKey="Superunique"
                    keyExtractor={this.keyExtractor}
                    data={list}
                    renderItem={this.renderItem}
                />
            </ScrollView>
            </View>
        );
    }
}

TribeGroup.propTypes = {};

export default TribeGroup;

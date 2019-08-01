import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import {connect} from 'react-redux';
import {addProfileImage} from '../../redux/actions';



class EditProfileImageBot extends Component {
    constructor(props){
        super(props);

        this.state = {
            avatarSource: ""


        }
    }

    render() {

        const options = {
            title: 'Select Avatar',
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const source = { uri: response.uri };

                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };

                // this.setState({
                //     avatarSource: source,
                // });
                this.props.dispatch(addProfileImage(source))
            }
        });


        return (
            <Text>  </Text>
        );
    }
}

EditProfileImageBot.propTypes = {};

export default connect()(EditProfileImageBot);



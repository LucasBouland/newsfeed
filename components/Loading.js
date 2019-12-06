import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { ActivityIndicator } from 'react-native-paper';

class Loading extends Component {

    static propTypes = {
        displayColor: PropTypes.string.isRequired
    }

    state = {}
    render() {
        console.log('children', this.props.children);
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color={this.props.displayColor} />
                <Text style={{ color: this.props.displayColor }}>Chargement...</Text>
                {this.props.children}
            </View>
        );
    }
}

export default Loading;
import React, { Component } from 'react';
import { View, Button, StyleSheet, Text, Image } from 'react-native';
import PropTypes from 'prop-types';
import { SwipeRow } from 'react-native-swipe-list-view';

class ItemNews extends Component {
    static propTypes = {
        onDelete: PropTypes.func.isRequired,
        news: PropTypes.any.isRequired
    }

    state = {}

    render() {
        return (
            <SwipeRow leftOpenValue={75} rightOpenValue={0} key={this.props.news.title}>
                <View style={styles.standaloneRowBack}>
                    <Button title="Suppr." onPress={() => this.props.onDelete(this.props.news.title)}></Button>
                </View>
                <View style={styles.standaloneRowFront}>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>Titre</Text>
                        <View style={{ flex: 1, flexDirection: 'row' }}>
                            <Text>Catégorie</Text>
                        </View>
                    </View>
                </View>
            </SwipeRow>
        );
    }
}

export default ItemNews;

const styles = StyleSheet.create({
    standaloneRowFront: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        justifyContent: 'center',
        height: 80,
    },
    standaloneRowBack: {
        alignItems: 'center',
        backgroundColor: '#CCC',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    backTextWhite: {
        color: '#FFF',
    }
});
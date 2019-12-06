import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import NewsService from '../services/NewsService';
import Loading from '../components/Loading';


export default class DetailsScreen extends Component {

    state = { data: null };

    serv = new NewsService();

    componentDidMount() {
        this.serv.getNewsByKeyword('').then(resp => {
            this.setState({ data: resp.data });
        });
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                {this.state.data ? (
                    <>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Titre</Text>
                        </View>
                        <View style={ { flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>Catégorie</Text>
                        </View>
                        <View style={{ flex: 3 }}>
                            <Text>Contenu</Text>
                        </View>
                    </>
                ) : (<Loading displayColor="orange">
                </Loading>)
                }
            </View>
        );
    }

}

const styles = StyleSheet.create({

});
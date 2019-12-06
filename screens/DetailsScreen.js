import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native';
import NewsService from '../services/NewsService';
import Loading from '../components/Loading';


export default class DetailsScreen extends Component {

    state = { data: null };

    serv = new NewsService();

    componentDidMount() {
        this.serv.getNewsByTitle(this.props.navigation.getParam('title', 'NONE')).then(resp => {
            this.setState({ data: resp.data });
            console.log(this.state.data);
            console.log(this.props.navigation.getParam('title'));
        });
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 2, marginTop : 10 }}>
                {this.state.data ? (
                    <>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{this.state.data.articles[0].title}</Text>
                        </View>
                        <View style={ { flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>image</Text>
                        </View>
                        <View style={ { flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{this.state.data.articles[0].publishedAt}</Text>
                        </View>
                        <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{this.state.data.articles[0].author}</Text>
                        </View>
                        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center'  }}>
                            <Text>{this.state.data.articles[0].content}</Text>
                        </View>
                    </>
                ) : (<Loading displayColor="orange">
                </Loading>)
                }
            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({

});
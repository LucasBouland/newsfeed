import React, { Component } from 'react';
import { AsyncStorage, View, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import NewsService from '../services/NewsService';
import ItemNews from '../components/ItemNews';
import { ActivityIndicator } from 'react-native-paper';

export default class HomeScreen extends Component {

    static navigationOptions = (e) => {
        return {
            title: '',
            headerRight: (
                <Icon size={25} name={'ios-add'}
                    onPress={() => {
                        e.navigation.push('Details');
                    }} />
            )
        }
    }

    serviceWeather = new NewsService();

    state = { news: null }

    async update() {

    }

    componentDidMount() {
        this.serviceWeather.getNewsByKeyword().then(resp => {
            this.setState({ news: resp.data });
            console.log(resp.data);
        });
        this.update();
    }



    componentDidUpdate() {
        this.update();
    }

    delete = async (newsName) => {
        const tab = this.state.articles.map(e => e.name);
        tab.splice(tab.findIndex(e => e === newsName), 1);
        await AsyncStorage.setItem('NEWS', JSON.stringify(tab));
        this.update();
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.news ? (
                    <FlatList data={this.state.news.articles}
                        renderItem={(e) => (
                            <ItemNews key={e.item.name} news={e.item} onPress={ () => {e.navigation.push('Details');}} onDelete={this.delete} />
                        )} />
                ) : (<ActivityIndicator />)}
            </View>
        );
    }
}
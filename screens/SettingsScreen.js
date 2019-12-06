import React, { Component } from 'react';
import { TextInput, Button, View, AsyncStorage } from 'react-native';
import NewsService from '../services/NewsService';

class SettingsScreen extends Component {
    static navigationOptions = (e) => {
        return {
            title: 'Ajouter une catégorie'
        }
    }

    serviceNews = new NewsService();

    state = { category: '' }

    onChange = (value) => {
        this.setState({ category: value });
    }

    save2 = async () => {
        let news = await this.serviceNews.getNewsByKeyword(this.state.category);
        if (news != null) {
            let data = await AsyncStorage.getItem('NEWS');
            let tab = [];
            if (data != null) {
                tab = JSON.parse(data);
            }
            tab.push(this.state.category);
            await AsyncStorage.setItem('NEWS', JSON.stringify(tab));
            this.props.navigation.goBack();
        } else {
            alert(`La catégorie n'existe pas`);
        }
    }

    save = () => {
        AsyncStorage.getItem('NEWS').then(data => {
            let tab = [];
            if (data != null) {
                tab = JSON.parse(data);
            }
            tab.push(this.state.category);
            AsyncStorage.setItem('NEWS', JSON.stringify(tab)).then(() => {
                this.props.navigation.goBack();
            });
        });

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <TextInput onChangeText={this.onChange} />
                <Button title="Ajouter" onPress={this.save2} />
            </View>
        );
    }
}

export default SettingsScreen;
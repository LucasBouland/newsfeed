import React, { Component } from "react";
import { AsyncStorage, View, Button, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import NewsService from "../services/NewsService";
import ItemNews from "../components/ItemNews";
import { ActivityIndicator } from "react-native-paper";
import _ from "lodash";

export default class HomeScreen extends Component {
    static navigationOptions = e => {
        return {
            title: "",
            headerRight: (
                <Icon
                    size={25}
                    name={"ios-add"}
                    onPress={() => {
                        e.navigation.push("Details");
                    }}
                />
            )
        };
    };

    serviceNews = new NewsService();

    state = { news: [], categories: [] };

    async update() {
        const categories = JSON.parse(await AsyncStorage.getItem("CATEGORIES"));
        let data = await AsyncStorage.getItem("NEWS");
        console.log(data);
        let allNews = [];
        console.log(categories);
        if (categories != null) {
            for (const c of categories) {
                cat = await this.serviceNews.getNewsByCategory(c);
                allNews = [].concat(...cat.data.articles);
            }
            uniquesNews = _.uniqBy(allNews, "title");
            console.log(uniquesNews);
            if (data != null) {
                uniquesNews = uniquesNews.filter(word => !data.includes(word.title));
            }
            this.setState({ news: uniquesNews });
        }
    }

    componentDidMount() {
        this.update();
    }

    delete = async newsName => {
        console.log('delete start ----------------------------------------------------------------------------------------------------------------------------');
        let data = await AsyncStorage.getItem('NEWS');
        let tab = [];
        if (data != null) {
            tab = JSON.parse(data);
        }
        tab.push(newsName);
        console.log(tab);
        await AsyncStorage.setItem('NEWS', JSON.stringify(tab));
        this.update();
        console.log('delete end --------------------------------------------------------------------------------------------------------------------------');
    };

    render() {
        return (
            <View style={{ flex: 1 }}>
                {this.state.news.length > 0 ? (
                    <FlatList
                        data={this.state.news}
                        renderItem={e => (
                            <>
                                <ItemNews
                                    key={e.item.title}
                                    news={e.item}
                                    onDelete={this.delete}
                                />
                                <Button
                                    title="Details"
                                    onPress={() => {
                                        this.props.navigation.push("Details", {
                                            title: e.item.title
                                        });
                                    }}
                                ></Button>
                            </>
                        )}
                    />
                ) : (
                        <ActivityIndicator />
                    )}
            </View>
        );
    }
}

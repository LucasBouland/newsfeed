import React, { Component } from "react";
import { AsyncStorage, View, Button, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import NewsService from "../services/NewsService";
import ItemNews from "../components/ItemNews";
import { ActivityIndicator } from "react-native-paper";

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

  state = { news: null, categories: [] };

  async update() {
    const categories = JSON.parse(await AsyncStorage.getItem("CATEGORIES"));
    const allNews = [];
    if (categories != null) {
      for (const c of categories) {
        cat = await this.serviceNews.getNewsByCategory(c);
        allNews.push(cat.articles);
      }
      this.setState({ categories: categories });
    }
  }

  componentDidMount() {
    this.serviceNews.getNewsByCategory().then(resp => {
      this.setState({ news: resp.data });
      console.log(resp.data);
      console.log(resp.data.articles[0].title, "-----------------------------");
      console.log(
        this.state.news.articles[0].title,
        "----------------------------- (mais via le state)"
      );
    });
    this.update();
  }

  delete = async newsName => {
    const tab = this.state.articles.map(e => e.name);
    tab.splice(
      tab.findIndex(e => e === newsName),
      1
    );
    await AsyncStorage.setItem("NEWS", JSON.stringify(tab));
    this.update();
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.news ? (
          <FlatList
            data={this.state.news.articles}
            renderItem={e => (
              <>
                <ItemNews
                  key={e.item.name}
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

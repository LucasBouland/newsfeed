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
    let allNews = [];
    if (categories != null) {
      for (const c of categories) {
        cat = await this.serviceNews.getNewsByCategory(c);
        allNews = [].concat(...cat.data.articles);
      }
      uniquesNews = _.uniqBy(allNews, "title");
      this.setState({ news: uniquesNews });
    }
  }

  componentDidMount() {
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
                    console.log("ee", e.item);
                    this.props.navigation.push("Details", {
                      detailsArticle: e.item
                    });
                  }}
                ></Button>
              </>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <ActivityIndicator />
        )}
      </View>
    );
  }
}

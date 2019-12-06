import React, { Component } from "react";
import { AsyncStorage, View, Button, FlatList, Text } from "react-native";
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
          style={{ marginRight: 20 }}
          size={25}
          name={"ios-sync"}
          onPress={e.navigation.getParam("update")}
        />
      )
    };
  };

  serviceNews = new NewsService();

  state = { news: [], categories: [], noCategories: false };

  update = async () => {
    const categories = JSON.parse(await AsyncStorage.getItem("CATEGORIES"));

    let data = await AsyncStorage.getItem("NEWS");
    console.log(categories);
    let allNews = [];
    if (categories.length > 0) {
      for (const c of categories) {
        cat = await this.serviceNews.getNewsByCategory(c);
        allNews = [].concat(...cat.data.articles);
      }
      uniquesNews = _.uniqBy(allNews, "title");
      if (data != null) {
        uniquesNews = uniquesNews.filter(word => !data.includes(word.title));
      }
      console.log(uniquesNews);
      this.setState({ noCategories: false });
      this.setState({ news: uniquesNews });
    } else {
      this.setState({ noCategories: true });
    }
  };

  componentDidMount() {
    this.props.navigation.setParams({ update: this.update });
    this.update();
  }

  delete = async newsName => {
    console.log(
      "delete start ----------------------------------------------------------------------------------------------------------------------------"
    );
    let data = await AsyncStorage.getItem("NEWS");
    let tab = [];
    if (data != null) {
      tab = JSON.parse(data);
    }
    tab.push(newsName);
    console.log(tab);
    await AsyncStorage.setItem("NEWS", JSON.stringify(tab));
    this.update();
    console.log(
      "delete end --------------------------------------------------------------------------------------------------------------------------"
    );
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        {this.state.noCategories ? (
          <Text>Vous devez selectionner des catégories</Text>
        ) : this.state.news.length > 0 ? (
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

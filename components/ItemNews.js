import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  Image,
  SafeAreaView
} from "react-native";
import PropTypes from "prop-types";
import { SwipeRow } from "react-native-swipe-list-view";

class ItemNews extends Component {
  static propTypes = {
    onDelete: PropTypes.func.isRequired,
    news: PropTypes.any.isRequired
  };

  state = {};

  render() {
    // titre, la source, la date de publication et une image.
    //Les news lues sont stockées dans le storage via un reducer.
    return (
      <SwipeRow
        leftOpenValue={75}
        rightOpenValue={0}
        key={this.props.news.title}
      >
        <View style={styles.standaloneRowBack}>
          <Button
            title="Suppr."
            onPress={() => this.props.onDelete(this.props.news.title)}
          ></Button>
        </View>
        <View style={styles.standaloneRowFront}>
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              justifyContent: "space-between"
            }}
          >
            <Text>{"Titre: " + this.props.news.title}</Text>
            <Text>{"Source:" + this.props.news.source.name}</Text>
            <Image
              style={{ width: 80, height: 80 }}
              source={{ uri: this.props.news.urlToImage }}
            />
            <Text>{"Publié le:" + this.props.news.publishedAt}</Text>
          </View>
        </View>
      </SwipeRow>
    );
  }
}

export default ItemNews;
//  <DatePublished time={this.props.news.publishedAt}></DatePublished>
const DatePublished = props => {
  const dt = Date.parse(props.time);
  const result = `${dt.now()}`;
  return <Text>Publié le: {result}</Text>;
};

const styles = StyleSheet.create({
  standaloneRowFront: {
    alignItems: "center",
    backgroundColor: "#CCC",
    justifyContent: "center",
    height: 180
  },
  standaloneRowBack: {
    alignItems: "center",
    backgroundColor: "#CCC",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15
  },
  backTextWhite: {
    color: "#FFF"
  }
});

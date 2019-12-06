import React, { Component } from "react";
import { Text, Button, View, AsyncStorage, SafeAreaView } from "react-native";
import MultiSelect from "react-native-multiple-select";
import NewsService from "../services/NewsService";

this.categories = [
  {
    name: "Affaires",
    id: "business"
  },
  {
    name: "Divertissement",
    id: "entertainment"
  },
  {
    name: "Général",
    id: "general"
  },
  {
    name: "Santé",
    id: "health"
  },
  {
    name: "Sciences",
    id: "science"
  },
  {
    name: "Sport",
    id: "sports"
  },
  {
    name: "Technologie",
    id: "technology"
  }
];

class SettingsScreen extends Component {
  static navigationOptions = e => {
    return {
      title: "Ajouter une catégorie"
    };
  };

  serviceNews = new NewsService();

  state = { selectedCategories: [], category: "" };

  componentDidMount() {
    AsyncStorage.getItem("CATEGORIES").then(data => {
      storedCategories = JSON.parse(data);
      if (storedCategories != null) {
        this.setState({ selectedCategories: storedCategories });
      }
    });
  }
  onChange = value => {
    this.setState({ category: value });
  };

  save = async () => {
    await AsyncStorage.setItem(
      "CATEGORIES",
      JSON.stringify(this.state.selectedCategories)
    );
  };

  onSelectedItemsChange = selectedCategories => {
    this.setState({ selectedCategories });

    //Set Selected Items
  };

  render() {
    const { selectedCategories } = this.state;
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, padding: 30 }}>
          <MultiSelect
            hideTags
            items={categories}
            uniqueKey="id"
            ref={component => {
              this.multiSelect = component;
            }}
            onSelectedItemsChange={this.onSelectedItemsChange}
            selectedItems={selectedCategories}
            selectText="Choisir les catégories"
            searchInputPlaceholderText="Rechercher une catégorie..."
            onChangeInput={text => console.log(text)}
            tagRemoveIconColor="#CCC"
            tagBorderColor="#CCC"
            tagTextColor="#CCC"
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            displayKey="name"
            searchInputStyle={{ color: "#CCC" }}
            hideSubmitButton={true}
            onPress={() => console.log("test")}
          />
        </View>
        <Cats ids={selectedCategories}></Cats>
        <Button title="Confirmer Catégories" onPress={this.save} />
      </SafeAreaView>
    );
  }
}

const Cats = props => {
  const c = categories.filter(ca => props.ids.includes(ca.id));
  txt = "";
  for (const z of c) {
    txt += z.name + " ";
  }
  return <Text>{txt}</Text>;
};
export default SettingsScreen;

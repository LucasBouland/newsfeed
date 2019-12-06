import React from "react";
import { StyleSheet } from "react-native";
import MainTabNavigator from "./navigation/MainTabNavigator";

import { Provider } from "react-redux";
import store from "./redux/store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <MainTabNavigator />
      </Provider>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

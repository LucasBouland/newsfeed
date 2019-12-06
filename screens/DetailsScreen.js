import React, { Component } from "react";
import { StyleSheet, Text, View, SafeAreaView, Image } from "react-native";
import NewsService from "../services/NewsService";
import Loading from "../components/Loading";

export default class DetailsScreen extends Component {
    state = { data: null };

    serv = new NewsService();

    componentDidMount() {
        this.setState({
            data: this.props.navigation.getParam("detailsArticle", null)
        });
    }

    render() {
        return this.state.data ? (
            <SafeAreaView style={{ flex: 2, marginTop: 10 }}>
                {this.state.data ? (
                    <>
                        <View
                            style={{
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text>Titre : {this.state.data.title}</Text>
                        </View>
                        <View
                            style={{
                                flex: 2,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Image
                                style={{ width: 80, height: 80 }}
                                source={{ uri: this.state.data.urlToImage }}
                            />
                        </View>
                        <View
                            style={{
                                flex: 3,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text>Date de publication : {this.state.data.publishedAt}</Text>
                            <Text>Auteur : {this.state.data.author}</Text>
                        </View>
                        <View
                            style={{
                                flex: 4,
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        >
                            <Text>Contenu : {this.state.data.content}</Text>
                        </View>
                    </>
                ) : (
                        <Loading displayColor="orange"></Loading>
                    )}
            </SafeAreaView>
        ) : (
                <></>
            );
    }
}

const styles = StyleSheet.create({});

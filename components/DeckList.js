import React, { Component } from "react";
import { connect } from "react-redux";
import {
  TouchableOpacity,
  FlatList,
  StyleSheet,
  View,
  Animated,
  ActivityIndicator,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import { handleGetDecks } from "../actions/index";
import { bubblegumpink } from "../utils/colors";

class DeckList extends Component {
  state = {
    opacity: new Animated.Value(0),
  };
  componentDidMount() {
    const { opacity } = this.state;
    this.props.dispatch(handleGetDecks());
    Animated.sequence([
      Animated.timing(opacity, {
        duration: 1000,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.spring(opacity, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }
  render() {
    const { navigation, decks } = this.props;
    const { opacity } = this.state;
    return (
      <Animated.View style={[styles.container, styles.horizontal, { opacity }]}>
        {decks.length > 0 ? (
          <FlatList
            data={decks}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.deck}
                onPress={() =>
                  navigation.navigate("Deck", { title: item.title })
                }
              >
                <View>
                  <Card.Content style={{ alignSelf: "center" }}>
                    <Title
                      style={{
                        fontWeight: "bold",
                        fontSize: 30,
                        color: "white",
                        marginTop: 30,
                      }}
                    >
                      {item.title}
                    </Title>
                    <Paragraph
                      style={{
                        fontSize: 20,
                        color: "white",
                        alignSelf: "center",
                      }}
                    >
                      {item.questions ? item.questions.length : 0} cards
                    </Paragraph>
                  </Card.Content>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <ActivityIndicator size="large" color={bubblegumpink} />
        )}
      </Animated.View>
    );
  }
}

const mapStateToProps = (decks) => {
  return {
    decks: Object.values(decks),
  };
};

export default connect(mapStateToProps)(DeckList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginTop: 50,
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  deck: {
    padding: 20,
    minHeight: 150,
    borderWidth: 1,
    borderColor: bubblegumpink,
    marginBottom: 20,
    backgroundColor: bubblegumpink,
    borderRadius: 20,
    alignSelf: "center",
    width: "90%",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
  },
});

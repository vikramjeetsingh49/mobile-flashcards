import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Alert,
  Animated,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { handleDeleteDeck } from "../actions/index";
import { bubblegumpink, rose, blazingOrange } from "../utils/colors";
import { Card, Title, Paragraph } from "react-native-paper";

function Deck(props) {
  const deck = props.deck(props.route.params.title);
  const bounceAnim = useRef(new Animated.Value(1)).current;
  React.useEffect(() => {
    Animated.sequence([
      Animated.timing(bounceAnim, {
        duration: 500,
        toValue: 1.05,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();
  }, [bounceAnim]);

  useEffect(() => {
    const parent = props.navigation.dangerouslyGetParent();
    parent.setOptions({
      tabBarVisible: false,
    });
    return () =>
      parent.setOptions({
        tabBarVisible: true,
      });
  }, []);

  const removeDeck = () => {
    if (Platform.OS == "ios" || Platform.OS == "android") {
      Alert.alert(
        "Delete Confirm",
        "Are you sure you want to delete this Deck?",
        [
          {
            text: "No",
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: () => {
              props
                .dispatch(handleDeleteDeck(deck.title))
                .then(() => props.navigation.goBack());
            },
          },
        ],
        { cancelable: false }
      );
    } else {
      const deleteDeck = confirm(
        "Delete Confirm",
        "Are you sure you want to delete this Deck?"
      );
      if (deleteDeck) {
        props
          .dispatch(handleDeleteDeck(deck.title))
          .then(() => props.navigation.goBack());
      }
    }
  };

  return deck ? (
    <View style={styles.container}>
      <Animated.View
        style={[styles.deck, { transform: [{ scale: bounceAnim }] }]}
      >
        <Card.Content>
          <Title style={styles.title}>{deck.title}</Title>
          <Paragraph
            style={{ fontSize: 20, color: "white", alignSelf: "center" }}
          >
            {deck.questions ? deck.questions.length : 0} cards
          </Paragraph>
        </Card.Content>

        <Card.Actions style={{ alignSelf: "center" }}>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "white" }]}
            onPress={() => {
              props.navigation.navigate("AddCard", { title: deck.title });
            }}
          >
            <Text style={[styles.btnText, { color: blazingOrange }]}>
              Add Card
            </Text>
          </TouchableOpacity>
          {deck.questions.length !== 0 && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: blazingOrange }]}
              disabled={deck.questions.length === 0}
              onPress={() => {
                props.navigation.navigate("Quiz", {
                  title: deck.title,
                  deck: deck,
                });
              }}
            >
              <Text style={[styles.btnText, { color: "white" }]}>
                Start Quiz
              </Text>
            </TouchableOpacity>
          )}
        </Card.Actions>
      </Animated.View>

      <TouchableOpacity style={styles.deleteBtn} onPress={removeDeck}>
        <Text style={styles.deleteBtnText}>Delete Deck</Text>
      </TouchableOpacity>
    </View>
  ) : (
    <Text>No Deck found...</Text>
  );
}

const mapStateToProps = (decks) => {
  return {
    deck: (id) => decks && decks[id],
  };
};

export default connect(mapStateToProps)(Deck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    marginTop: 40,
  },
  deck: {
    alignSelf: "center",
    minHeight: 200,
    width: "90%",
    borderWidth: 2,
    borderColor: bubblegumpink,
    backgroundColor: bubblegumpink,
    borderRadius: 20,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  title: {
    fontWeight: "bold",
    fontSize: 40,
    color: "white",
    marginTop: 30,
    alignSelf: "center",
    padding: 20,
  },
  button: {
    padding: 20,
    margin: 10,
    marginTop: 50,
    borderColor: blazingOrange,
    borderWidth: 4,
    borderRadius: 50,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  deleteBtn: {
    padding: 10,
    margin: 50,
    borderColor: rose,
    borderWidth: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  deleteBtnText: {
    color: rose,
    fontWeight: "bold",
    fontSize: 20,
  },
});

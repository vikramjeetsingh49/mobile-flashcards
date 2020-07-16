import React, { Component } from "react";
import {
  Text,
  Alert,
  View,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Card, Title, TextInput } from "react-native-paper";
import { connect } from "react-redux";
import { handleAddDeck } from "../actions";
import { blazingOrange, lightsky, rose } from "../utils/colors";

class NewDeck extends Component {
  state = {
    title: "",
  };

  handleAddDeck = () => {
    const { decks, dispatch, navigation } = this.props;
    const { title } = this.state;
    if (decks[title]) {
      if (Platform.OS == "ios" || Platform.OS == "android") {
        Alert.alert("This deck name already exists.");
      } else {
        alert("This deck name already exists.");
      }
    } else {
      dispatch(handleAddDeck(title)).then(() => {
        navigation.navigate("Deck", {
          title: title,
        });

        this.setState({ title: "" });
      });
    }
  };

  render() {
    const { title } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Card style={styles.card}>
              <Card.Content>
                <Title>
                  <Text style={styles.text}>
                    What is the title of your new Deck ?
                  </Text>
                </Title>

                <TextInput
                  label={title === "" ? "Deck Title" : ""}
                  value={title}
                  style={{ marginTop: 30 }}
                  multiline={true}
                  mode="outlined"
                  onChangeText={(text) => {
                    this.setState({ title: text });
                  }}
                />
              </Card.Content>
            </Card>
            <TouchableOpacity
              disabled={title === ""}
              style={
                title === ""
                  ? [
                      styles.submitBtn,
                      { backgroundColor: "white", borderColor: rose },
                    ]
                  : [
                      styles.submitBtn,
                      {
                        backgroundColor: rose,
                        borderColor: rose,
                      },
                    ]
              }
              onPress={this.handleAddDeck}
            >
              <Text
                style={
                  title === ""
                    ? [styles.submitBtnText, { color: rose }]
                    : [styles.submitBtnText, { color: lightsky }]
                }
              >
                Create Deck
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = (decks) => {
  return {
    decks,
  };
};

export default connect(mapStateToProps)(NewDeck);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
    marginTop: 20,
  },
  card: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: blazingOrange,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
  text: {
    margin: 0,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  submitBtn: {
    padding: 10,
    margin: 50,
    borderWidth: 5,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  submitBtnText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

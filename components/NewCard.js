import React, { Component } from "react";
import {
  Text,
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
import { handleAddCard } from "../actions";
import { blazingOrange, rose, lightsky } from "../utils/colors";

class NewCard extends Component {
  state = {
    question: "",
    answer: "",
  };

  handleAddCard = () => {
    const { dispatch, navigation, route } = this.props;
    const { question, answer } = this.state;
    const card = {
      question: question,
      answer: answer,
    };
    dispatch(handleAddCard(route.params.title, card)).then(() =>
      navigation.goBack()
    );
  };

  render() {
    const { question, answer } = this.state;
    const { route } = this.props;
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Card style={styles.card}>
              <Card.Content>
                <Title style={[styles.title, { alignItems: "center" }]}>
                  {route.params.title}
                </Title>

                <TextInput
                  label={question === "" ? "Question" : ""}
                  value={question}
                  style={{ marginTop: 30 }}
                  multiline={true}
                  mode="outlined"
                  onChangeText={(text) => {
                    this.setState({ question: text });
                  }}
                />

                <TextInput
                  label={answer === "" ? "Answer" : ""}
                  value={answer}
                  style={{ marginTop: 30 }}
                  multiline={true}
                  mode="outlined"
                  onChangeText={(text) => {
                    this.setState({ answer: text });
                  }}
                />
              </Card.Content>
            </Card>

            <TouchableOpacity
              disabled={question === "" || answer === ""}
              style={
                question === "" || answer === ""
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
              onPress={this.handleAddCard}
            >
              <Text
                style={
                  question === "" || answer === ""
                    ? [styles.submitBtnText, { color: rose }]
                    : [styles.submitBtnText, { color: lightsky }]
                }
              >
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    );
  }
}

export default connect()(NewCard);

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
  title: {
    margin: 0,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  submitBtn: {
    padding: 10,
    margin: 40,
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

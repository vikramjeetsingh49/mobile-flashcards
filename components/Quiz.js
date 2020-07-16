import React, { useRef, useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";
import {
  buffOrange,
  blazingOrange,
  spacegreen,
  spacered,
} from "../utils/colors";
import { clearLocalNotification, setLocalNotification } from "../utils/helpers";

const Quiz = (props) => {
  useEffect(() => {
    clearLocalNotification()
      .then(setLocalNotification)
      .catch((e) => console.log("error", e));
  }, []);

  const deck = props.route.params.deck;
  const [currentCard, setCard] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(0);
  const [flipCard, setFlipCard] = useState(true);
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [value, setValue] = useState(0);
  flipAnim.addListener(({ value }) => {
    setValue(value);
  });
  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const handleFlip = () => {
    if (value >= 90) {
      Animated.spring(flipAnim, {
        toValue: 0,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(flipAnim, {
        toValue: 180,
        friction: 8,
        tension: 10,
        useNativeDriver: true,
      }).start();
    }
  };

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };
  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Title style={styles.heading}>Quiz</Title>
        {deck.questions.length > currentCard ? (
          flipCard ? (
            <View>
              <Animated.View
                style={[{ backfaceVisibility: "hidden" }, frontAnimatedStyle]}
              >
                <Card.Content style={styles.deck}>
                  <Title style={styles.title}>
                    Question:
                    {currentCard + 1 + "/" + deck.questions.length}
                  </Title>
                  <Paragraph style={styles.paragraph}>
                    {deck.questions[currentCard].question}
                  </Paragraph>
                </Card.Content>
              </Animated.View>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: spacegreen }]}
                onPress={() => {
                  setFlipCard(!flipCard);
                  handleFlip();
                }}
              >
                <Text style={styles.btnText}>Show Answer</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Animated.View
                style={[{ backfaceVisibility: "hidden" }, backAnimatedStyle]}
              >
                <Card.Content style={styles.deck}>
                  <Title style={styles.title}>
                    Question :{currentCard + 1 + "/" + deck.questions.length}
                  </Title>
                  <Paragraph style={styles.paragraph}>
                    {deck.questions[currentCard].question}
                  </Paragraph>
                </Card.Content>
                <Card.Content style={styles.deck}>
                  <Title style={styles.title}>Answer</Title>
                  <Paragraph style={styles.paragraph}>
                    {deck.questions[currentCard].answer}
                  </Paragraph>
                </Card.Content>
              </Animated.View>
              <Card.Actions style={{ alignSelf: "center" }}>
                <TouchableOpacity
                  style={[styles.button, { backgroundColor: spacegreen }]}
                  onPress={() => {
                    setCard(currentCard + 1);
                    setCorrectAnswer(correctAnswer + 1);
                    setFlipCard(!flipCard);
                    handleFlip();
                  }}
                >
                  <Text style={[styles.btnText, { color: "white" }]}>
                    Correct
                  </Text>
                </TouchableOpacity>
                {deck.questions.length !== 0 && (
                  <TouchableOpacity
                    style={[styles.button, { backgroundColor: spacered }]}
                    disabled={deck.questions.length === 0}
                    onPress={() => {
                      setCard(currentCard + 1);
                      setFlipCard(!flipCard);
                      handleFlip();
                    }}
                  >
                    <Text style={[styles.btnText, { color: "white" }]}>
                      Incorrect
                    </Text>
                  </TouchableOpacity>
                )}
              </Card.Actions>
            </View>
          )
        ) : (
          <View>
            <Card.Content style={styles.deck}>
              <Text style={styles.resultText}>You scored </Text>
              <Text style={styles.resultText}>
                {correctAnswer} / {deck.questions.length}
              </Text>
              <Text style={styles.resultText}>
                ({(correctAnswer / deck.questions.length).toFixed(2) * 100} %)
              </Text>
            </Card.Content>

            <TouchableOpacity
              style={[styles.button, { backgroundColor: spacegreen }]}
              onPress={() => props.navigation.goBack()}
            >
              <Text style={styles.btnText}>Go Back</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: spacered }]}
              onPress={() => {
                setCard(currentCard - deck.questions.length);
                setCorrectAnswer(0);
                setValue(0);
                handleFlip();
              }}
            >
              <Text style={styles.btnText}>Restart the quiz</Text>
            </TouchableOpacity>
          </View>
        )}
      </Card>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  card: {
    borderWidth: 1,
    borderColor: blazingOrange,
    margin: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 10,
    backgroundColor: blazingOrange,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  resultText: {
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    fontStyle: "italic",
    color: blazingOrange,
  },
  heading: {
    fontWeight: "bold",
    fontSize: 40,
    color: "white",
    textAlign: "center",
    padding: 20,
  },
  deck: {
    marginTop: 10,
    alignSelf: "center",
    padding: 20,
    width: "90%",
    borderWidth: 2,
    borderColor: buffOrange,
    backgroundColor: "white",
    borderRadius: 40,
    shadowOffset: { width: 8, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    color: buffOrange,
    padding: 10,
  },
  paragraph: {
    fontSize: 20,
    color: buffOrange,
    padding: 10,
    lineHeight: 30,
  },
  button: {
    padding: 10,
    margin: 10,
    marginTop: 30,
    borderWidth: 4,
    borderRadius: 50,
  },
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
});

import AsyncStorage from "@react-native-community/async-storage";

const DECK_STORAGE_KEY = "mobileflashcards:decks";

const initialData = {
  React: {
    title: "React",
    questions: [
      {
        question: "What is React?",
        answer: "A library for managing user interfaces",
      },
      {
        question: "Where do you make Ajax requests in React?",
        answer: "The componentDidMount lifecycle event",
      },
    ],
  },
  JavaScript: {
    title: "JavaScript",
    questions: [
      {
        question: "What is a closure?",
        answer:
          "The combination of a function and the lexical environment within which that function was declared.",
      },
    ],
  },
};

export function getDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    return data[title];
  });
}

export async function getAllDecks() {
  const results = await AsyncStorage.getItem(DECK_STORAGE_KEY);
  if (results) {
    const data = JSON.parse(results);
    return data;
  } else {
    await AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
}

export function saveDeckTitle(title) {
  return AsyncStorage.mergeItem(
    DECK_STORAGE_KEY,
    JSON.stringify({
      [title]: {
        title: title,
        questions: [],
      },
    })
  );
}

export function addCardToDeck(title, card) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    const deck = data[title];
    deck.questions = deck.questions.concat([card]);
    AsyncStorage.mergeItem(
      DECK_STORAGE_KEY,
      JSON.stringify({
        [title]: deck,
      })
    );
  });
}

export function removeDeck(title) {
  return AsyncStorage.getItem(DECK_STORAGE_KEY).then((results) => {
    const data = JSON.parse(results);
    delete data[title];
    AsyncStorage.setItem(DECK_STORAGE_KEY, JSON.stringify(data));
  });
}

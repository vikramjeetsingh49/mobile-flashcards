import {
  getAllDecks,
  saveDeckTitle,
  addCardToDeck,
  removeDeck,
} from "../utils/api";

export const GET_DECKS = "GET_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";
export const DELETE_DECK = "DELETE_DECK";

export function getDecks(decks) {
  return {
    type: GET_DECKS,
    decks,
  };
}

export function handleGetDecks() {
  return (dispatch) => {
    return getAllDecks().then((decks) => {
      dispatch(getDecks(decks));
    });
  };
}

export function addDeck(title) {
  return {
    type: ADD_DECK,
    title,
  };
}

export function handleAddDeck(title) {
  return (dispatch) => {
    return saveDeckTitle(title).then(() => {
      dispatch(addDeck(title));
      return title;
    });
  };
}

export function addCard(title, card) {
  return {
    type: ADD_CARD,
    title,
    card,
  };
}

export function handleAddCard(title, card) {
  return (dispatch) => {
    return addCardToDeck(title, card).then(() => {
      dispatch(addCard(title, card));
    });
  };
}

export function deleteDeck(title) {
  return {
    type: DELETE_DECK,
    title,
  };
}

export function handleDeleteDeck(title) {
  return (dispatch) => {
    return removeDeck(title).then(() => {
      dispatch(deleteDeck(title));
      return true;
    });
  };
}

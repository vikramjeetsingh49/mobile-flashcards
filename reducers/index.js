import {
  GET_DECKS,
  ADD_DECK,
  ADD_CARD,
  DELETE_DECK,
} from "../actions/index";

export default function decks(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks,
      };

    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        },
      };

    case ADD_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions, action.card],
        },
      };

    case DELETE_DECK:
      delete state[action.title];
      return {
        ...state
      };

    default:
      return state;
  }
}
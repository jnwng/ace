import {combineReducers} from 'redux';
import {
  SHOW_NEXT_CARD,
  SHOW_LAST_CARD,
  SHOW_STACK,
  SHOW_LINKED_CARDS,
  HIDE_LINKED_CARDS,
  RECEIVE_CARDS
} from '../constants/ActionTypes';

function cards(state = {}, action) {
  switch (action.type) {

    case RECEIVE_CARDS:
      return action.cards;

    default:
      return state;
  }
}

const initialState = {
  currentIndex: 0,
  cards: [],
  stack: [],
  showingLinkedCards: false
};

function cardsToShow(state = initialState, action) {
  switch (action.type) {

    case SHOW_NEXT_CARD:
      var {showingLinkedCards, currentIndex, cards} = state;

      if (showingLinkedCards && currentIndex + 1 === cards.length - 1) {
        // we actually want to hide when we get back to the original card, i think
        return cardsToShow(state, {
          type: HIDE_LINKED_CARDS
        });
      }

      return {
        ...state,
        currentIndex: state.currentIndex + 1
      };

    case SHOW_LAST_CARD:
      return {
        ...state,
        currentIndex: Math.max(state.currentIndex - 1, 0)
      };

    case SHOW_STACK:
      return {
        ...state,
        cards: action.cards,
        currentIndex: 0
      };

    case SHOW_LINKED_CARDS:
      // push current cards onto stack, return the cards that are linked
      return {
        ...state,
        cards: action.cards,
        currentIndex: 0,
        showingLinkedCards: true,
        stack: [{
          cards: state.cards,
          currentIndex: state.currentIndex
        }, ...state.stack]
      };

    case HIDE_LINKED_CARDS:
      /* eslint-disable no-redeclare */
      var [{cards, currentIndex}, ...restOfStack] = state.stack;
      return {
        ...state,
        cards,
        currentIndex,
        showingLinkedCards: false,
        stack: restOfStack
      };

    default:
      return state;
  }
}

function cardStore(state = {}, action) {
  /* eslint-disable no-shadow */
  var _cards = cards(state.cards, action);

  switch (action.type) {
    case SHOW_LINKED_CARDS:
      var currentCard = state.cardsToShow.cards[state.cardsToShow.currentIndex];
      action.cards = [
        ...currentCard.linkedCards.map(cardId => state.cards[cardId]),
        currentCard
      ];
      break;
    default:
      break;
  }

  return {
    cards: _cards,
    cardsToShow: cardsToShow(state.cardsToShow, action)
  };
}

const rootReducer = combineReducers({
  cardStore
});

export default rootReducer;

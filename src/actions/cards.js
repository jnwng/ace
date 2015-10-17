import * as types from '../constants/ActionTypes';

var Firebase = require('firebase');
var cardsRef = new Firebase('https://ace-coursera.firebaseio.com/cards');

export function toggleStar(id) {
  return {
    type: types.TOGGLE_STAR,
    id
  };
}

function showStack(cards) {
  return {
    type: types.SHOW_STACK,
    cards
  };
}

function receiveCards(cards) {
  return dispatch => {

    // This can be eliminated when we have the action to show the filtered stack.
    var cardsList = Object.keys(cards).map((key, index) => {
      var card = cards[key];
      card.index = index;
      return card;
    });
    dispatch(showStack(cardsList));

    return {
      type: types.RECEIVE_CARDS,
      cards
    };
  };
}

export function fetchCards() {
  return dispatch => {
    cardsRef.limitToFirst(10).once('value', snapshot => {
      var cards = snapshot.val();
      Object.keys(cards).forEach(key => {
        cards[key].id = key;
      });
      dispatch(receiveCards(cards));
    });
  };
}

export function showNextCard() {
  return {
    type: types.SHOW_NEXT_CARD
  };
}

export function showLastCard() {
  return {
    type: types.SHOW_LAST_CARD
  };
}

import * as types from '../constants/ActionTypes';
import data from '../../testData.json';

// var Firebase = require('firebase');
// var cardsRef = new Firebase('https://ace-coursera.firebaseio.com/cards');

export function toggleStar(id) {
  return {
    type: types.TOGGLE_STAR,
    id
  };
}

export function showStack(stackId) {
  var stacks = data.stacks;
  var stack = stacks[stackId];
  var cards = stack.cards.map(cardId => data.cards[cardId]);

  return {
    type: types.SHOW_STACK,
    cards
  };
}

function receiveCards(cards) {
  return {
    type: types.RECEIVE_CARDS,
    cards
  };
}

export function fetchCards() {
  return dispatch => {
    // cardsRef.limitToFirst(10).once('value', snapshot => {
      // var cards = snapshot.val();
    var cards = require('../../testData.json').cards;
    Object.keys(cards).forEach(key => {
      cards[key].id = key;
    });
    dispatch(receiveCards(cards));
    // });
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

export function showLinkedCards(card) {
  return {
    type: types.SHOW_LINKED_CARDS,
    cards: card.linkedCards
  };
}

export function hideLinkedCards(card) {
  return {
    type: types.HIDE_LINKED_CARDS
  };
}

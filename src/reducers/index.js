import {combineReducers} from 'redux';
import {
  SHOW_NEXT_CARD,
  SHOW_LAST_CARD,
  SHOW_STACK,
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

// const cardStackInitialState = {
//   poppedStack: [],
//   currentStack: []
// };

// function cardStack(state = cardStackInitialState, action) {
//   var {poppedStack, currentStack} = state;
//   switch (action.type) {

//     case SHOW_NEXT_CARD:
//       return Object.assign({}, state, {
//         poppedStack: [...poppedStack, currentStack.pop()],
//         currentStack,
//       });

//     case SHOW_LAST_CARD:
//       return Object.assign({}, state, {
//         currentStack: [poppedStack.pop(), ...currentStack],
//         poppedStack,
//       });

//     case SHOW_STACK:
//       return Object.assign({}, state, {
//         currentStack: action.cards
//       });

//     default:
//       return state;
//   }
// }


const initialState = {
  currentIndex: 0,
  cards: [],
};

function cardsToShow(state = initialState, action) {
  switch (action.type) {

    case SHOW_NEXT_CARD:
      return Object.assign({}, state, {
        currentIndex: state.currentIndex + 1
      });

    case SHOW_LAST_CARD:
      return Object.assign({}, state, {
        currentIndex: state.currentIndex - 1
      });

    case SHOW_STACK:
      return Object.assign({}, state, {
        cards: action.cards
      });

    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cards,
  // cardStack,
  cardsToShow
});

export default rootReducer;

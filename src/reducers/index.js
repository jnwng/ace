import {combineReducers} from 'redux';
import {TOGGLE_STAR} from '../constants/ActionTypes';

const initialState = [{
  id: '1',
  type: 'text',
  text: 'yo-text',
  starred: false,
  notes: []
}];

function cards(state = initialState, action) {
  switch (action.type) {
    case TOGGLE_STAR:
      return state.map(card =>
        card.id === action.id ?
          Object.assign({}, card, {starred: !card.starred}) :
          card
        );
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cards,
});

export default rootReducer;

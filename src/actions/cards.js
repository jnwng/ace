import * as types from '../constants/ActionTypes';

export function toggleStar(id) {
  return {
    type: types.TOGGLE_STAR,
    id
  };
}

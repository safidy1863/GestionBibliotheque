import {
  AJOUT_LECTEUR,
  LISTE_LECTEURS,
} from "../actions/lecteurs.action";

const initialState = {};

export default function lecteursReducer(state = initialState, action) {
  switch (action.type) {
    case LISTE_LECTEURS:
      return action.payload;
    case AJOUT_LECTEUR:
      return [action.payload, ...state];
    default:
      return state;
  }
}

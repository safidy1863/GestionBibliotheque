import {
  AJOUT_LIVRE,
  LISTE_LIVRES,
} from "../actions/livres.action";

const initialState = {};

export default function livresReducer(state = initialState, action) {
  switch (action.type) {
    case LISTE_LIVRES:
      return action.payload;
    case AJOUT_LIVRE:
      return [action.payload, ...state];
    default:
      return state;
  }
}

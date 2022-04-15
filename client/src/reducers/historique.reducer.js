import { HISTORIQUE } from "../actions/historique.action";

const initialState = {};

export default function historiqueReducer(state = initialState, action) {
  switch (action.type) {
    case HISTORIQUE:
      return action.payload;
    default:
      return state;
  }
}

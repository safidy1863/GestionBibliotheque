import { LISTE_PRETS } from "../actions/prets.action";

const initialState = {};

export default function pretsReducer(state = initialState, action) {
  switch (action.type) {
    case LISTE_PRETS:
      return action.payload;
    default:
      return state;
  }
}
